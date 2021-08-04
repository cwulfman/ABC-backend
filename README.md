export AWS_PROFILE=abcbackenddeploy

aws s3 mb s3://abc-backend-deploy-development

sam validate
sam build
sam package --output-template-file packaged.yaml --s3-bucket abc-backend-deploy-development
sam deploy --template-file packaged.yaml --capabilities CAPABILITY_IAM --stack-name ABCBackendDevelopment2 --parameter-overrides environment=development

# Send message

TODO: Replace with acutal function names for ABC-Backend
sam local invoke LookupFunction --event events/lookupEvent.json

### non-persistant dynamodb

docker run -p 8000:8000 amazon/dynamodb-local

Seeding data:

sh db-init.sh

Definitions and data in db-json/

TODO: Add tables. Note that there may be attribute name syntax rules that I've broken here...

aws dynamodb create-table --table-name abc_voters_local --attribute-definitions AttributeName=voterIdNumber,AttributeType=S --key-schema AttributeName=voterIdNumber,KeyType=HASH --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 --endpoint-url http://localhost:8000

aws dynamodb put-item --table-name abc_voters_local --item '{ "voterIdNumber": {"S": "abc12"}, "firstName": {"S": "Bill"}, "lastName": {"S": "Smith"} }' --return-consumed-capacity TOTAL --endpoint-url http://localhost:8000

aws dynamodb scan --table-name abc_voters_local --endpoint-url http://localhost:8000

http://localhost:8000

# API gateway

sam local start-api --env-vars local-env.json

local-env.json: 'OSX' vs 'Windows' vs 'Linux'

TODO: update these urls and data structures for ABC-backend data

curl http://127.0.0.1:3000/getElection

curl --header "Content-Type: application/json" --request POST --data '{"IDnumber":"emptyresponse", "firstName":"Rowan", "lastName": "Quinn", "dateOfBirth":"2000-04-01"}' http://localhost:3000/lookupVoterByIDnumber

curl --header "Content-Type: application/json" --request POST --data '{"IDnumber":"12-34-56-79", "firstName":"Rowan", "lastName": "Quinn", "dateOfBirth":"2000-04-01"}' http://localhost:3000/lookupVoterByIDnumber

curl --header "Content-Type: application/json" --request POST --data '{"IDnumber":"C01234567890", "firstName":"Blake", "lastName": "Emerson", "dateOfBirth":"2000-04-01"}' http://localhost:3000/lookupVoterByIDnumber

curl --header "Content-Type: application/json" --request POST --data '{"email_address": "alex.mekelburg@gmail.com", "use_case_id": "101", "message_id": "2"}' http://127.0.0.1:3000/use-case-messages

# Dev URLs:

curl --header "Content-Type: application/json" https://zieqc1fcrg.execute-api.us-east-1.amazonaws.com/development/getElection

//Easter eggs
curl --header "Content-Type: application/json" --request POST --data '{"IDnumber":"emptyresponse", "firstName":"Rowan", "lastName": "Quinn", "dateOfBirth":"2000-04-01"}' https://zieqc1fcrg.execute-api.us-east-1.amazonaws.com/development/lookupVoterByIDnumber
curl --header "Content-Type: application/json" --request POST --data '{"IDnumber":"wrongresponse", "firstName":"Rowan", "lastName": "Quinn", "dateOfBirth":"2000-04-01"}' https://zieqc1fcrg.execute-api.us-east-1.amazonaws.com/development/lookupVoterByIDnumber
curl --header "Content-Type: application/json" --request POST --data '{"IDnumber":"noresponse", "firstName":"Rowan", "lastName": "Quinn", "dateOfBirth":"2000-04-01"}' https://zieqc1fcrg.execute-api.us-east-1.amazonaws.com/development/lookupVoterByIDnumber

// DLN lookup
curl --header "Content-Type: application/json" --request POST --data '{"IDnumber":"C01234567890", "firstName":"Blake", "lastName": "Emerson", "dateOfBirth":"2000-04-01"}' https://zieqc1fcrg.execute-api.us-east-1.amazonaws.com/development/lookupVoterByIDnumber
// State ID lookup
curl --header "Content-Type: application/json" --request POST --data '{"IDnumber":"12-34-56-79", "firstName":"Rowan", "lastName": "Quinn", "dateOfBirth":"2000-04-01"}' https://zieqc1fcrg.execute-api.us-east-1.amazonaws.com/development/lookupVoterByIDnumber

//To Do: S3; All tests; Re-do ID Number (DLN, State) implementation
