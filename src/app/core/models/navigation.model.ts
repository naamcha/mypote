import { Deserializable } from './deserializable.model';
import { MicroLocalisation, MicrolocLight } from './microlocalisation.model';


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

export class Navigation implements Deserializable {
    public journeys: Journey[];
    public segnemts: Segment[];

    deserialize(input: any): this {
        this.journeys = input.journeys.map((journey: Journey) => new Journey().deserialize(journey));
        this.segnemts = input.segments.map((segnemt: Segment) => new Segment().deserialize(segnemt));
        return this;
    }
    getSegment(segId: number): Segment {
        console.log(this.segnemts);
        return this.segnemts.find(seg => { console.log(seg.segmentId, segId); return seg.segmentId == segId });
    }
    getSegmentsFromStartEnd(startPoint: MicrolocLight, endPoint: MicrolocLight): Segment[] {
        console.log('////// getSegmentsFromStartEnd 0 ///////', startPoint, endPoint, this.journeys)
        let journey = this.journeys.find(journey => {

            return undefined !== journey.startPoint.find(microLightStart => {
                microLightStart = new MicrolocLight().deserialize(microLightStart)
                return microLightStart.equalsTo(startPoint);
            })
                && undefined !== journey.endPoint.find(microLightEnd => {
                    microLightEnd = new MicrolocLight().deserialize(microLightEnd)
                    return microLightEnd.equalsTo(endPoint)
                })
        })
        console.log('////// getSegmentsFromStartEndzzz 1 ///////', startPoint, endPoint, journey, journey.segmentIdChain);
        console.log('////// getSegmentsFromStartEnd 1zzz ///////', (journey) ? journey.segmentIdChain.map(segId => { return this.getSegment(segId) }) : undefined);
        return (journey) ? journey.segmentIdChain.map(segId => { return this.getSegment(segId) }) : undefined;
    }
    isStratPointInJourney(startPoint: MicrolocLight,journey : Journey): boolean {
        let inJourney = new MicrolocLight();
        inJourney =  journey.startPoint.find(microLightStart => {
            microLightStart = new MicrolocLight().deserialize(microLightStart)
            return microLightStart.equalsTo(startPoint);
        })
        return (inJourney!==undefined)
    }
    isEndPointInJourney(startPoint: MicrolocLight,journey : Journey): boolean {
        let inJourney = new MicrolocLight();
        inJourney =  journey.endPoint.find(microLightEnd => {
            microLightEnd = new MicrolocLight().deserialize(microLightEnd)
            return microLightEnd.equalsTo(startPoint);
        })
        return (inJourney!==undefined)
    }
}

