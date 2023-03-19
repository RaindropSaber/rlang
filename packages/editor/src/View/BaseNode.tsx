import { memo } from 'react';
export default memo((props: any) => {
  console.log('baseNode props', props?.node?.store?.data?.size);
  return <div style={{ ...props?.node?.store?.data?.size, backgroundColor: '#12e312' }} />;
});
