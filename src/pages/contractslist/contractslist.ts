import {Component, Inject} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService} from "../../app/auth.service";
import { NimbleService} from "../../app/nimble.service";
import {ProductmanagerPage} from "../advanced/productmanager/productmanager";
import { ContractdetailsPage} from "../contractdetails/contractdetails";
import {ShowDataChannelPage} from "../show-data-channel/show-data-channel";

/**
 * Generated class for the ContractslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contractslist',
  templateUrl: 'contractslist.html',
})
export class ContractslistPage {
  collaborations: any;
  loading = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService,public nimble: NimbleService,
              @Inject('NIMBLE_ENDPOINT') public nimbleEndPoint: any) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContractslistPage');

    let c1 = this.nimble.getContractList1();

    let c2 = this.nimble.getContractList2();

    Promise.all([c1,c2])
      .then(values => {
        let dcPromise = [];
        console.log("c1");console.log(c1);
        console.log("c2");console.log(c2);
        //this.loading = false;

        this.collaborations = values[0].collaborationGroups.concat(values[1].collaborationGroups);
        console.log(this.collaborations);
        Object.keys(this.collaborations).forEach((key) => {
          this.collaborations[key].processInstance = 'LOADING...';
          this.collaborations[key].brandName = 'LOADING...';
        });
        Object.keys(this.collaborations).forEach((key) => {
          let max = 0;
          let item = this.collaborations[key].associatedProcessInstanceGroups[0];
          console.log(this.collaborations[key]);
          item.processInstanceIDs.forEach((val) => {
            if (val > max) max = val;
          });
          console.log("max collaboration "+key+" : "+max);
          this.collaborations[key].processInstance = max;
          this.nimble.getProcessInstance(max)
            .then((res) => {
              //console.log("Preso processInstance per "+max);
              //console.log(res);
              //console.log()
              if (typeof(res.requestDocument.item.manufacturerParty.brandName[0]) != 'undefined') this.collaborations[key].brandName = res.requestDocument.item.manufacturerParty.brandName[0].value;
              else this.collaborations[key].brandName = 'NN';
            })

          dcPromise[key] = this.nimble.getBusinessProcessFromId(this.collaborations[key].associatedProcessInstanceGroups[0].associatedGroups[0])
            .then((bpf) => {
              console.log("bpf");
              console.log(bpf);
              this.collaborations[key].datachannel = bpf;
              if (bpf.startDateTime == null) {
                this.collaborations[key].datachannel.DataChannelShow = false;
                this.collaborations[key].datachannel.DataChannelType = "Negotiating";
              }
              else if (bpf.startDateTime != null && bpf.endDateTime == null) {
                this.collaborations[key].datachannel.DataChannelShow = true;
                this.collaborations[key].datachannel.DataChannelType = "Started";
              }
              else if (bpf.endDateTime != null) {
                this.collaborations[key].datachannel.DataChannelShow = false;
                this.collaborations[key].datachannel.DataChannelType = "Closed";
              }

              if (this.collaborations[key].datachannel.usePrivateServers) {
                this.collaborations[key].datachannel.DataChannelType += " private";
              }
              else {
                this.collaborations[key].datachannel.DataChannelType += " internal";
              }


            })
            .catch((bpferr) => {
              console.log("bpf err");
              console.log(bpferr);
              this.collaborations[key].datachannel = bpferr;
              this.collaborations[key].datachannel.DataChannelShow = false;
              this.collaborations[key].datachannel.DataChannelType = "No data chanel";

            })


        });

        Promise.all(dcPromise)
          .then((values) => {
            this.loading = false;
          });
        /*
         0:
archived: false
associatedCollaborationGroups: [6356]
associatedProcessInstanceGroups: Array(1)
0:
archived: false
associatedGroups: ["6041780c-9ba3-40cf-ba08-11b2ed6ab897"]
collaborationRole: "BUYER"
firstActivityTime: "2019-07-03T10:05:18.971+00:00"
id: "b8000dbf-ce1b-41bd-bfb6-10fe88ffae6f"
lastActivityTime: "2019-07-03T10:05:18.971+00:00"
name: "creazione siti web"
partyID: "11304"
precedingProcess: null
precedingProcessInstanceGroup: null
processInstanceIDs: ["296785"]
         */

      })

    //Prendo i due JSON

  }

  goContract(id) {
    //this.collaborations[id].associatedProcessInstanceGroups[0].associatedGroups[0]
    this.navCtrl.push(ShowDataChannelPage, { data : this.collaborations[id].datachannel});
    //this.navCtrl.push(ContractdetailsPage, { group : this.collaborations[id].associatedProcessInstanceGroups[0].associatedGroups[0]});
  }

}
