// Note: /opt/Common is where all the lib layer code gets put
const { Voter, ApiResponse } = require("/opt/Common");

exports.lambdaHandler = async (event, context, callback) => {
  const requiredArgs = [
    "ZIP5",
    "stateCode",
    "city",
    "dateOfBirth",
    "lastName",
    "streetAddress",
    "firstName",
    "addressLine2",
  ];

  const messageBody = JSON.parse(event.body);

  if (!requiredArgs.every((x) => messageBody.hasOwnProperty(x))) {
    return ApiResponse.makeResponse(500, { error: "Incorrect arguments" });
  }

  const {
    ZIP5,
    stateCode,
    city,
    dateOfBirth,
    lastName,
    streetAddress,
    firstName,
    addressLine2,
  } = messageBody;

  /*
  if (
    process.env.AWS_SAM_LOCAL ||
    process.env.DEPLOYMENT_ENVIRONMENT === "development"
  ) {
    if (ZIP5.toLowerCase() === "emptyresponse") {
      return ApiResponse.makeResponse(200, Voter.emptyResponse);
    } else if (ZIP5.toLowerCase() === "wrongresponse") {
      return ApiResponse.makeResponse(200, Voter.wrongResponse);
    } else if (ZIP5.toLowerCase() === "noresponse") {
      return ApiResponse.makeResponse(200, Voter.noResponse);
    }
  }
  */

  const voter = await Voter.findByAddress(
    ZIP5,
    stateCode,
    city,
    dateOfBirth,
    lastName,
    streetAddress,
    firstName,
    addressLine2
  );
  if (!voter) {
    return ApiResponse.noMatchingVoter(messageBody);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(voter.attributes, null, 2),
  };
  return response;
};
