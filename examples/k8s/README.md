# zenika/alpine-chrome in k8s

Here is an example with kubernetes on how to launch and use `zenika/alpine-chrome`.

## Launch

Inside this folder, run the following command:

```
kubectl apply -f deployment.yml
```

## Test

You can port forward from your cluster to your local machine with following command

```
kubectl port-forward deployment/alpine-chrome-deployment 9222
```

Then go to `localhost:9222` with your browser (must be a chrome base browser!)
You can enter `https://google.com` or any service you want to call.

## Configuration

You may change the `zenika/alpine-chrome` image you want to use modifying the line 23 in `deployment.yml`.
