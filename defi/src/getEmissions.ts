import {
  wrap,
  IResponse,
  errorResponse,
  successResponse,
} from "./utils/shared";
import { createChartData } from "./emissions/utils/test";
import adapters from "./emissions/protocols";
import { ChartSection, Protocol } from "./emissions/types/adapters";

const handler = async (event: any): Promise<IResponse> => {
  const protocolName: string = event.pathParameters?.protocol?.toLowerCase();
  const adapter: Protocol = (adapters as any)[protocolName];
  if (!adapter) {
    return errorResponse({
      message: `The passed protocol name is invalid. Make sure '${adapter}' is a key of './emissions/protocols/index.ts`,
    });
  }
  const data: ChartSection[] = await createChartData(adapter);
  return successResponse(data);
};

export default wrap(handler);
