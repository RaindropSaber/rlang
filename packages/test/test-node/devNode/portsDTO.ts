export default interface T_RPortDTO {
  [PortType.I]: {};
  [PortType.O]: {
    out: {
      hello: string;
    };
    out2: {
      hi: string;
    };
    [ssss: string]: any;
  };
}
