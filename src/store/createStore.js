import { createStore, compose, applyMiddleware } from 'redux';
/**
 * compose: join more than 1 instructions to be executed
 */

export default (reducers, middlewares) => {
  /** for reactotron work with redux and Saga Middleware */
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(
          console.tron.createEnhancer(),
          applyMiddleware(...middlewares)
        )
      : applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
