import { Deserializable } from './deserializable.model';
import { MicroLocalisation, MicrolocLight } from './microlocalisation.model';

export class Navigation implements Deserializable {
    public journeys: Journey[];
    public segnemts: Segment[];

    deserialize(input: any): this {
        console.log(input)
        this.journeys = input.journeys.map((journey) => new Journey().deserialize(journey));
        this.segnemts = input.segments.map((segnemt) => new Segment().deserialize(segnemt));
        return this;
    }
    getSegment(segId):Segment{
        return this.segnemts.find(seg=>seg.segmentId == segId);
    }
    getSegmentsFromStartEnd(startPoint:MicroLocalisation,endPoint:MicroLocalisation):Segment[]{
        return this.journeys.find(journey => 
            undefined !== journey.startPoint.find(microLightStart => microLightStart == startPoint.toMicrolight())
            && undefined !== journey.endPoint.find(microLightEnd => microLightEnd == endPoint.toMicrolight())
        ).segmentIdChain.map(segId=>this.getSegment(segId));
    }
}
export class Journey implements Deserializable {
    public journeyId: string;
    public startPoint: MicrolocLight[];
    public endPoint: MicrolocLight[];
    public segmentIdChain: number[];
    
    deserialize(input: any): this {
        Object.assign(this, input);
        this.startPoint = input.startPoint.map((segnemt) => new Segment().deserialize(segnemt));   
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
        return this;
    }
}

