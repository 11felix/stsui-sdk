import { EventId, PaginatedEvents } from "@mysten/sui/client";
import { getSuiClient } from "./client.js";
import { getConf } from "./ids.js";
import {
  CommonEventParams,
  EpochChangedEvent,
  EventName,
  EventType,
  FlashStakeEvent,
  MintEvent,
  RedeemEvent,
} from "./types.js";

export class Events {
  static async getEpochChangeEvents(
    params: CommonEventParams,
  ): Promise<EpochChangedEvent[]> {
    return await this.getEvents<EpochChangedEvent>(params, "EpochChangedEvent");
  }

  static async getMintEvents(params: CommonEventParams): Promise<MintEvent[]> {
    return await this.getEvents<MintEvent>(params, "MintEvent");
  }

  static async getRedeemEvents(
    params: CommonEventParams,
  ): Promise<RedeemEvent[]> {
    return await this.getEvents<RedeemEvent>(params, "RedeemEvent");
  }
  static async getFlashStakeEvents(
    params: CommonEventParams,
  ): Promise<FlashStakeEvent[]> {
    return await this.getEvents<FlashStakeEvent>(params, "FlashStakeEvent");
  }

  static async getEvents<T extends EventType>(
    params: CommonEventParams,
    eventName: EventName,
  ): Promise<T[]> {
    const events: T[] = [];
    let startTime = 0;
    let endTime = Date.now();
    if (params.startTime) {
      startTime = params.startTime;
    }
    if (params.endTime) {
      endTime = params.endTime;
    }
    if (startTime > endTime) {
      return events;
    }
    let hasNext = true;
    let startCursor: EventId | null | undefined;

    while (hasNext) {
      const eventData: PaginatedEvents = await getSuiClient().queryEvents({
        cursor: startCursor,
        order: "descending",
        query: {
          MoveEventType: `${getConf().STSUI_FIRST_PACKAGE_ID}::events::Event<${getConf().STSUI_FIRST_PACKAGE_ID}::liquid_staking::${eventName}>`,
        },
      });

      for (const eve of eventData.data) {
        const event = {
          ...(eve.parsedJson as T),
          sender: eve.sender,
          timestamp: eve.timestampMs,
          txDigest: eve.id.txDigest,
          eventSeq: eve.id.eventSeq,
          type: eve.type,
        } as T;
        if ("0x" + event.event.typename.name !== params.typeName) {
          continue;
        }
        if (Number(eve.timestampMs!) > endTime) {
          continue;
        }
        if (Number(eve.timestampMs!) < startTime) {
          return events;
        }
        events.push(event);
      }
      hasNext = eventData.hasNextPage;
      startCursor = eventData.nextCursor;
    }

    return events;
  }
}
