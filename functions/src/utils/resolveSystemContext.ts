import { Context } from "@netlify/functions/dist/function/context"
import { SystemContext } from "../enums/SystemContext"
import { Event } from "@netlify/functions/dist/function/event"

// go pattern
export const resolveSystemContext = (
  event: Event
): [SystemContext | null, Error | null] => {
  if (
    event &&
    event.queryStringParameters &&
    event.queryStringParameters["SYSTEM_CONTEXT"] &&
    (event.queryStringParameters["SYSTEM_CONTEXT"] === SystemContext.STAGING ||
      event.queryStringParameters["SYSTEM_CONTEXT"] ===
        SystemContext.PRODUCTION)
  ) {
    return [event.queryStringParameters["SYSTEM_CONTEXT"] as SystemContext, null]
  }
  return [null, new Error("SYSTEM_CONTEXT not set")]
}
