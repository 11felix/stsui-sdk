import { EventId, PaginatedEvents } from "@mysten/sui/client";
import { getSuiClient } from "./client.js";
import { getConf } from "./ids.js";
import {
  CommonEventParams,
  EpochChangedEvent,
  FlashStakeEvent,
  MintEvent,
  RedeemEvent,
} from "./types.js";

export class Events {
  static async getEpochChangeEvents(
    params: CommonEventParams,
  ): Promise<EpochChangedEvent[]> {
    const events: EpochChangedEvent[] = [];
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
          MoveEventType: `${getConf().STSUI_FIRST_PACKAGE_ID}::events::Event<${getConf().STSUI_FIRST_PACKAGE_ID}::liquid_staking::EpochChangedEvent>`,
        },
      });

      for (const eve of eventData.data) {
        if (Number(eve.timestampMs!) > endTime) {
          continue;
        }
        if (Number(eve.timestampMs!) < startTime) {
          return events;
        }
        const event = {
          ...(eve.parsedJson as EpochChangedEvent),
          sender: eve.sender,
          timestamp: eve.timestampMs,
        } as EpochChangedEvent;
        events.push(event);
      }
      hasNext = eventData.hasNextPage;
      startCursor = eventData.nextCursor;
    }
    return events;
  }

  static async getMintEvents(params: CommonEventParams): Promise<MintEvent[]> {
    const events: MintEvent[] = [];
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
          MoveEventType: `${getConf().STSUI_FIRST_PACKAGE_ID}::events::Event<${getConf().STSUI_FIRST_PACKAGE_ID}::liquid_staking::MintEvent>`,
        },
      });

      for (const eve of eventData.data) {
        if (Number(eve.timestampMs!) > endTime) {
          continue;
        }
        if (Number(eve.timestampMs!) < startTime) {
          return events;
        }
        const event = {
          ...(eve.parsedJson as MintEvent),
          sender: eve.sender,
          timestamp: eve.timestampMs,
        } as MintEvent;
        events.push(event);
      }
      hasNext = eventData.hasNextPage;
      startCursor = eventData.nextCursor;
    }
    return events;
  }

  static async getRedeemEvents(
    params: CommonEventParams,
  ): Promise<RedeemEvent[]> {
    const events: RedeemEvent[] = [];
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
          MoveEventType: `${getConf().STSUI_FIRST_PACKAGE_ID}::events::Event<${getConf().STSUI_FIRST_PACKAGE_ID}::liquid_staking::RedeemEvent>`,
        },
      });

      for (const eve of eventData.data) {
        if (Number(eve.timestampMs!) > endTime) {
          continue;
        }
        if (Number(eve.timestampMs!) < startTime) {
          return events;
        }

        const event = {
          ...(eve.parsedJson as RedeemEvent),
          sender: eve.sender,
          timestamp: eve.timestampMs,
        } as RedeemEvent;
        events.push(event);
      }
      hasNext = eventData.hasNextPage;
      startCursor = eventData.nextCursor;
    }

    return events;
  }
  static async getFlashStakeEvents(
    params: CommonEventParams,
  ): Promise<FlashStakeEvent[]> {
    const events: FlashStakeEvent[] = [];
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
          MoveEventType: `${getConf().STSUI_FIRST_PACKAGE_ID}::events::Event<${getConf().STSUI_FIRST_PACKAGE_ID}::liquid_staking::FlashStakeEvent>`,
        },
      });

      for (const eve of eventData.data) {
        if (Number(eve.timestampMs!) > endTime) {
          continue;
        }
        if (Number(eve.timestampMs!) < startTime) {
          return events;
        }

        const event = {
          ...(eve.parsedJson as FlashStakeEvent),
          sender: eve.sender,
          timestamp: eve.timestampMs,
        } as FlashStakeEvent;
        events.push(event);
      }
      hasNext = eventData.hasNextPage;
      startCursor = eventData.nextCursor;
    }

    return events;
  }
}
