import Event from "../util/Event";

export default class LineChart extends Event {
    constructor(canvas, context, option) {
        super();

        this.canvas = canvas;
        this.ctx = context;
        this.option = option;

        const { originX, originY } = this._calOriginCoord();
        this.originX = originX;
        this.originY = originY;
    }
    render() {
        const ctx = this.ctx;
    
        // 1.画布轮廓
        const { canvas: { x, y, width, height } } = this.option;
        ctx.strokeRect(x, y, width, height);
        // 2.坐标轴
        ctx.beginPath();
        this._drawAxis({
            ctx: this.ctx,
            originCoord: {
                originX: this.originX,
                originY: this.originY
            },
            data: this.option.data
        });
        // 3.折线
        this._drawLineDataPoints({ 
            data: this.option.data, 
            ctx: this.ctx 
        });
        ctx.stroke();
    }

    isEventInRegion(clientX, clientY) {
        const eventPoint = this._translateCoord(clientX, clientY);
        const { canvas: { x, y, width, height } } = this.option;
        
        const xInRange = eventPoint.x > x && eventPoint.x < x + width;
        const yInRange = eventPoint.y > y && eventPoint.y < y + height;
        return xInRange && yInRange;
    }

    _translateCoord(clientX, clientY) {
        const bbox = this.canvas.getBoundingClientRect();
        return {
            x: clientX - bbox.left,
            y: clientY - bbox.top
        }
    }

    // 计算坐标轴原点坐标
    _calOriginCoord() {
      return {
        originX: 50, 
        originY: 250
      };
    }

    // 转换数值到坐标点
    _convertVal2Coord(val, index) {
        const scaleFactor = 5;
        return {
            x: 50  + 50 * ( index + 1 ),
            y: 100 + (50 - val) * scaleFactor, 
        };
    }

    // 坐标轴绘制
    _drawAxis({ ctx, originCoord, data }) {
        this._doDrawAxis({
            type: 'x',
            axisData: this.option.xAxis,
            data,
            ctx,
            originCoord,
        });
        this._doDrawAxis({
            type: 'y',
            axisData: this.option.yAxis,
            ctx,
            originCoord
        });
    }

    _doDrawAxis({ type, axisData, data, ctx, originCoord }) {
        const { originX, originY } = originCoord;
        switch(type) {
            case 'x':
            {
                ctx.moveTo(originX, originY);
                let xAxisXCoord, xAxisYCoord;
                axisData.forEach((val, index) => {
                    xAxisXCoord = 50 + 50 * (index+1);
                    xAxisYCoord = 250;
                    ctx.lineTo(xAxisXCoord, xAxisYCoord);
                    ctx.arc(xAxisXCoord, xAxisYCoord, 2, 0, 2 * Math.PI);
                });
                // 延续坐标轴
                ctx.lineTo(xAxisXCoord + 50, xAxisYCoord);
                break;
            }
            case 'y':
            {
                ctx.moveTo(originX, originY);
                let yAxisXCoord = 50, yAxisYCoord = 250;

                // TODO: 自动计算Y轴范围
                // const { minY, maxY } = this._calYCoordRange(data);

                axisData.forEach((val, index) => {
                    yAxisYCoord = 250 - 50 * index;
                    ctx.lineTo(yAxisXCoord, yAxisYCoord);
                    ctx.arc(yAxisXCoord, yAxisYCoord, 2, 0, 2 * Math.PI);
                    ctx.moveTo(yAxisXCoord, yAxisYCoord); // fix: 竖直方向上画完点后画笔会偏移,手动修正
                });
                ctx.lineTo(yAxisXCoord, yAxisYCoord - 50); // 延续坐标轴
                break;
            }
            default:
                break;
        }
    }


    // 绘制折线
    _drawLineDataPoints({ data, ctx }) {
        let drawFlag = false;
        data.forEach((val, index) => {
            let { x, y } = this._convertVal2Coord(val, index);
            if(!drawFlag){
            drawFlag = true;
            ctx.moveTo(x,y);
            } else {
            ctx.lineTo(x,y);
            }
            ctx.arc(x, y, 2, 0, 2 * Math.PI);
        });
    }

  }