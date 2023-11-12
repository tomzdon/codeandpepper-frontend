import React from 'react';

export const TypedMemo: <T>(c: T, propsAreEqual?: Parameters<typeof React.memo>[1]) => T = React.memo;
