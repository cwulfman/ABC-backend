const { Election, ApiResponse } = require("/opt/Common");

exports.lambdaHandler = async (event, context, callback) => {
  const elections = await Election.all();
  if (!elections || elections.length == 0) {
    return ApiResponse.noElectionResponse();
  }

  const response = ApiResponse.makeResponse(
    200,

    elections.map((election) => election.attributes)
  );
  return response;
};
