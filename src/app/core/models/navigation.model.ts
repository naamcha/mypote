import { Deserializable } from './deserializable.model';
import { MicrolocLight } from './microlocalisation.model';


export class Journey implements Deserializable {
    public journeyId: string;
    public startPoint: MicrolocLight[];
    public endPoint: MicrolocLight[];
    public segmentChain: Segment[];

    deserialize(input: any): this {
        Object.assign(this, input);
        this.startPoint = input.startPoint.map((point) => new MicrolocLight().deserialize(point));
        this.endPoint = input.endPoint.map((point) => new MicrolocLight().deserialize(point));
        return this;
    }
}
export class Segment implements Deserializable {
    public segmentId: number;
    public startPoint: MicrolocLight;
    public endPoint: MicrolocLight;
    public segmentRouterPath: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        this.startPoint = new MicrolocLight().deserialize(input.startPoint);
        this.endPoint = new MicrolocLight().deserialize(input.endPoint);
        return this;
    }

}

export class Navigation implements Deserializable {
    public journeys: Journey[];
    public segments: Segment[];

    deserialize(input: any): this {
        this.segments = input.segments.map((segnemt: Segment) => new Segment().deserialize(segnemt));
        let journeys = input.journeys.map(journ =>{
            console.log('Navigation deserialize',journ);
            journ.segmentChain = journ.segmentChain.map(segId =>{
                console.log('Navigation deserialize',segId,this.segments,this.getSegment(segId));
                return this.segments.find((seg:any) => { 
                    return seg.id == segId 
                });
            })
            return journ;
        })
        console.log('Navigation deserialize',journeys);
        this.journeys = input.journeys.map((journey: Journey) => new Journey().deserialize(journey));
        return this;
    }
    getSegment(segId: number): Segment {
        console.log(this.segments);
        return this.segments.find(seg => { 
            return seg.segmentId == segId 
        });
    }
    getSegmentsFromStartEnd(startPoint: MicrolocLight, endPoint: MicrolocLight): Segment[] {
        console.log('////// getSegmentsFromStartEnd 0 ///////', startPoint, endPoint, this.journeys)
        let journey = this.journeys.find(journey => (this.isStratPointInJourney(startPoint,journey) == true && this.isEndPointInJourney(endPoint,journey) == true));
        console.log('////// getSegmentsFromStartEndzzz 1 ///////', journey);
        return (journey) ? journey.segmentChain : undefined;
    }
    isStratPointInJourney(startPoint: MicrolocLight,journey : Journey): boolean {
        return undefined != journey.startPoint.find(jstartp => {
            console.log('startPoint',jstartp,startPoint,jstartp.equalsTo(startPoint))
            return jstartp.equalsTo(startPoint);
        })
    }
    isEndPointInJourney(endPoint: MicrolocLight,journey : Journey): boolean {
        return undefined != journey.endPoint.find(jendp => {
            console.log('endPoint',jendp,endPoint,jendp.equalsTo(endPoint))
            return jendp.equalsTo(endPoint);
        })
    }
}

