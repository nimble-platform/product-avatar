/**
 * Created by Rabah-pc on 07/06/2017.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
  /* public Server: string = 'http://localhost:8088/';
  public ApiUrl: string = 'api/';
  public ServerWithApiUrl = this.Server + this.ApiUrl; */

  public _QUALITYDATA_STREAM: string = "IT_WHIRPOOL_STREAMS_DC_QUALITYDATA";
  public _BUYDATA_STREAM: string = "IT_WHIRPOOL_STREAMS_DC_BUYDATA";
  public _ASSISTANCEDATA_STREAM: string = "IT_WHIRPOOL_STREAMS_ASSISTANCEDATA";
  public _PRODUCTIONDATA_STREAM: string = "IT_WHIRPOOL_STREAMS_DC_PRODUCTIONDATA";
  public _INTERVENTION_DATA_STREAM: string = "IT_WHIRPOOL_STREAMS_DC_INTERVENTDATA";
  public _PRODUCTDATA_STREAM: string = "IT_WHIRPOOL_STREAMS_DC_PRODUCTDATA";
}
