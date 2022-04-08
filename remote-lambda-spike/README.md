#Assuming a role in another account

To do try this out, you need two accounts.  We'll refer to them as `calling account` and `called account`.
It may be useful to jot down which one you're using for which purpose as this stuff gets confusing fast.

## The basics

To invoke a lambda the lambda must be assigned a role which allows that lambda to be invoked.
Most of the time this is done for you by the tools you use to create the lambda.
It is fairly simple because everything happens in the same account.
If you want to invoke a lambda in a `called account` using a lambda in `calling account` the lambda in `calling account` needs to assume a role in the `called account` which allows the lambda to be invoked.
The role in the `called accounts` needs to trust the `calling accont`.
The final layer of confusion is that the lambda in `calling account` needs a role which allows it to assume the role in `called account`.
Any role that is used by a lambda also has to grant permissions to create and stream logs.

## Bootstrapping

To get things working both accounts need to know things about the other accounts.

### Called account

* Account ID to trust

### Calling account

* ARN of the role to assume provided by `called account`
* ARN of the lambda that will be invoked in `called account`

It makes sense to create the called stack first.

```shell
remote-lambda-spike $ cd called-lambda
called-lambda $ sam build
called-lambda $ sam deploy --capabilities NAMED_IAM_CAPABILITY --guided
called-lambda $ cd -
remote-lamdba-spike $
```
 Using the --guided option will prompt you for the value of `AccountToTrust`.
 You can also use the `--parameter-overrides "AccountToTrust=123456789012` option if you already have a `samconfig.toml` file in place.
 
The stack created in `called account` should output the values needed for creating the stack in `calling account`.

```shell
remote-lambda-spike $ cd calling-lambda
calling-lambda $ sam build
calling-lambda $ sam deploy --capabilities NAMED_IAM_CAPABILITY --guided
calling-lambda $ cd -
remote-lamdba-spike $
```
You can explicitly specify the parameter values here too if you wish `--parameter-overrides "RoleArn=arn:aws:iam::210987654321:role/called-lambda-InvokeLambdaRole-SOMEJUNK FunctionName=arn:aws:lambda:eu-west-2:21098765432:function:called-lambda-CalledFunction-MOREJUNK"`

It may be possible to explicitly create a name for a lambda and use that in the short form but the ARN definitely works.