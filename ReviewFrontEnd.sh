TEMPLATE_URL="file://frontend/create-static-website-s3-bucket.yaml"

# If the bucket doesn't exit then create a new one
if aws s3 ls "s3://$S3_BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'
then
  aws cloudformation create-stack --stack-name ${S3_BUCKET_NAME} --template-body $TEMPLATE_URL --parameters ParameterKey=S3BucketName,ParameterValue=$S3_BUCKET_NAME
fi;

# Wait until bucket is created
aws s3api wait bucket-exists --bucket "$S3_BUCKET_NAME";
BUCKET_EXIST_RESULT=$?
echo "bucket-exists result: $BUCKET_EXIST_RESULT"
if [[ $BUCKET_EXIST_RESULT -ne 0 ]]; then exit $BUCKET_EXIST_RESULT; fi;

# If the bucket exist copy the the built files
if [[ $? -eq 0 ]];
then
  echo "Copying to ${S3_BUCKET_NAME}"
  aws s3 cp frontend/dist s3://${S3_BUCKET_NAME} --recursive;
  echo $FRONTEND_URL;
fi;