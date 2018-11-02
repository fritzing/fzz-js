let parseXml = require('xml2js').parseString;

/**
* the FZ constructor
 *
 */
class FZ {
	/**
	 *
   */
	constructor(uri) {
	  this.xml = undefined; // store the raw xml data
	  this.filename = uri || ''; // store the fzz filename
		this.fritzingVersion = '';
	  this.boards = []; // list of FZBoard items
	  this.programs = {}; // list of FZProgram items
	  this.instances = {}; //
	  this.views = {}; //
	}

	/**
	 * get the BOM
	 */
	getBOM() {
	  let bomData = [];
	  for (let i = 0; i < this.fz.instances.length; i++) {
	    // console.log(this.fz.instances[i]);
	    if (this.fz.instances[i].moduleIdRef !== 'WireModuleID' && this.fz.instances[i].moduleIdRef !== 'LogoImageModuleID') {
	      let bomItem = {
	        moduleIdRef: this.fz.instances[i].moduleIdRef,
	        active: true,
	      };
	      bomData.push(bomItem);
	    }
	  }
	  return bomData;
	}
}

/**
 */
class FZBoard {
	/**
   * the FZBoard constructor
   */
	constructor() {
	  this.moduleId = '';
	  this.title = '';
	  this.instance = '';
	  this.width = '';
	  this.height = '';
	}
}

/**
 */
class FZProgram {
	/**
   * the FZProgram constructor
   */
	constructor() {
	  this.language = '';
	  this.source = '';
	}
}

// parse fz xml data and return a FZ object.
function parseFZ(filename, src, cb) {
	let tmpFZ = new FZ();
  tmpFZ.filename = filename;
  tmpFZ.xml = src;

  parseXml(src, (err, xmlDoc) => {
		// if (xmlDoc) {
			// console.log('#-------------------------------------');
			// // console.log(JSON.stringify(xmlDoc, '', '  '));
			// console.log(xmlDoc);
			// console.log('#-------------------------------------');

			// tmpFZ.fritzingVersion = xmlDoc.module.$.fritzingVersion
		//
	    // var tmpXML = xmlDoc.documentElement.childNodes;
	    // console.log(tmpXML);
	  //   for (var i = 0; i < tmpXML.length; i++) {
	  //     // console.log(tmpXML[i].nodeName);
		//
	  //     switch (tmpXML[i].nodeName) {
	  //       case 'boards':
	          // tmpFZ.boards = parseFZBoards(xmlDoc.module.boards);
	  //         break;
		//
	  //       case 'programs':
	          // tmpFZ.programs = parseFZPrograms(xmlDoc.module.programs);
	  //         break;
		//
	  //       case 'views':
	          // tmpFZ.views = parseFZViews(xmlDoc.module.views);
	  //         break;
		//
	  //       case 'instances':
	          // tmpFZ.instances = parseFZInstances(xmlDoc.module.instances);
	  //         break;
		//
	  //       default:
	  //       // console.log(tmpXML[i]);
	  //     }
		//
	  //   }
		//
	  // }
		//
	  // // console.log(tmpFZ);
	  // return tmpFZ;

		cb(xmlDoc);
	});
}

function parseFZBoards(xml) {
  // console.log('parseFZBoards', xml);
  let tmpNodes = xml.childNodes;
  // console.log('BOARD', tmpNodes.length, tmpNodes);

  let tmpBoards = [];

  for (let j = 0; j < tmpNodes.length; j++) {
    // console.log(tmpNodes[j]);
    if (tmpNodes[j].nodeName === 'board') {
      // console.log(tmpNodes[j].attributes);

      let tmpBoard = new FZBoard();
      let tmpAttr = tmpNodes[j].attributes;
      for (let a = 0; a < tmpAttr.length; a++) {
        // console.log(tmpAttr[a]);
        switch (tmpAttr[a].name) {
          case 'moduleId':
            tmpBoard.moduleId = tmpAttr[a].nodeValue;
            // console.log('tmpBoard.moduleId', tmpBoard.moduleId);
            break;
          case 'title':
            tmpBoard.title = tmpAttr[a].nodeValue;
            break;
          case 'instance':
            tmpBoard.instance = tmpAttr[a].nodeValue;
            break;
          case 'width':
            // TODO: parse measurement
            tmpBoard.width = tmpAttr[a].nodeValue;
            break;
          case 'height':
            // TODO: parse measurement
            tmpBoard.height = tmpAttr[a].nodeValue;
            break;
          default:
        }
      }
      tmpBoards.push(tmpBoard);
    }
  }
  // console.log('tmpBoards:', tmpBoards);
  return tmpBoards;
 }

function parseFZPrograms(xml) {
	// console.log('parseFZPrograms', xml);
  let programs = [];
  for (let i = 0; i < xml.childNodes.length; i++) {
    let tmpNode = xml.childNodes[i];
    // console.log('view', tmpNode);
    if (tmpNode.nodeName === 'program') {
      // console.log(tmpNode);

      let tmpProgram = new FZProgram();
      tmpProgram.source = tmpNode.innerHTML;

      for (let a = 0; a < tmpNode.attributes.length; a++) {
        let tmpAttr = tmpNode.attributes[a];
        switch (tmpAttr.name) {
          case 'language':
            tmpProgram.language = tmpAttr.nodeValue;
            break;
        }
      }

      programs.push(tmpProgram);
    }
  }
  return programs;
}

function parseFZViews(xml) {
	// console.log('parseFZViews', xml);

  // the object we want to return
  let views = [];

  for (let i = 0; i < xml.childNodes.length; i++) {
    let tmpNode = xml.childNodes[i];
    // console.log('view', tmpNode);

    if (tmpNode.nodeName === 'view') {
      // console.log('attributes', tmpNode.attributes);

      // the view data we push to the views variable
      let tmpView = {
        name: '',
        backgroundColor: '',
        gridSize: '',
        showGrid: true,
        alignToGrid: true,
        viewFromBelow: false,
        gpgKeepout: '',
        autorouteViaHoleSize: '',
        autorouteTraceWidth: '',
        autorouteViaRingThickness: '',
        drcKeepout: '',
      };

      for (let a = 0; a < tmpNode.attributes.length; a++) {
        let tmpAttr = tmpNode.attributes[a];
        switch (tmpAttr.name) {
          case 'name':
            tmpView.name = tmpAttr.nodeValue;
            break;

          case 'backgroundColor':
            tmpView.backgroundColor = tmpAttr.nodeValue;
            break;

          case 'gridSize':
            tmpView.gridSize = tmpAttr.nodeValue;
            break;

          case 'showGrid':
            tmpView.showGrid = tmpAttr.nodeValue;
            break;

          case 'alignToGrid':
            tmpView.alignToGrid = tmpAttr.nodeValue;
            break;

          case 'viewFromBelow':
            tmpView.viewFromBelow = tmpAttr;
            break;
        }
      }

      views.push(tmpView);
    }
  }

  return views;
}

function parseFZInstances(xml) {
	// console.log('parseFZInstances', xml);

  let instances = [];

  for (let i = 0; i < xml.childNodes.length; i++) {
    let tmpNode = xml.childNodes[i];
    // console.log('view', tmpNode);

    if (tmpNode.nodeName === 'instance') {
      // console.log(tmpNode);

      let tmpInstance = {
          moduleIdRef: '',
          modelIndex: '',
          path: '',
          property: {
            name: '',
            value: '',
          },
          title: '',
          views: {
            breadboardView: undefined,
            pcbView: undefined,
            schematicView: undefined,
          },
      };

      // get the attributes of the instance tag...
      // console.log('attributes', tmpNode.attributes);
      for (let a = 0; a < tmpNode.attributes.length; a++) {
        let tmpAttr = tmpNode.attributes[a];
        switch (tmpAttr.name) {
          case 'moduleIdRef':
            tmpInstance.moduleIdRef = tmpAttr.nodeValue;
            break;
          case 'modelIndex':
            tmpInstance.modelIndex = tmpAttr.nodeValue;
            break;
          case 'path':
            tmpInstance.path = tmpAttr.nodeValue;
            break;
        }
      }

      // get the instance tag childs...
      // console.log(tmpNode.childNodes);
      for (let j = 0; j < tmpNode.childNodes.length; j++) {
        // console.log('--', j, tmpNode.childNodes[j]);
        switch (tmpNode.childNodes[j].nodeName) {
          // get property...
          case 'property':
            var tmpProp = tmpNode.childNodes[j];
            // console.log('tmpProp:', tmpProp);
            // get attributes...
            for (let pa = 0; pa < tmpProp.attributes.length; pa++) {
              // console.log(tmpProp.attributes[pa]);
              switch (tmpProp.attributes[pa].name) {
                case 'name':
                  tmpInstance.property.name = tmpProp.attributes[pa].nodeValue;
                  break;
                case 'value':
                  tmpInstance.property.value = tmpProp.attributes[pa].nodeValue;
                  break;
              }
            }
            break;

          // get title...
          case 'title':
            // console.log('TITLE', tmpNode.childNodes[j].innerHTML);
            tmpInstance.title = tmpNode.childNodes[j].innerHTML;
            break;

          // get views...
          case 'views':
            tmpInstance.views = parseFZInstancesViews(tmpNode.childNodes[j]);
            break;
        }
      }

      instances.push(tmpInstance);
    }
  }

  return instances;
}

function parseFZInstancesViews(xml) {
	// console.log('call parseFZInstancesViews', xml);
  let tmpViews = {
    breadboardView: undefined,
    pcbView: undefined,
    schematicView: undefined,
  };


  for (var i = 0; i < xml.childNodes.length; i++) {
    let tmpNode = xml.childNodes[i];
    // console.log(tmpNode.nodeName);

    let tmpInstanceView = {
      layer: '',
      geometry: {
        x: 0,
        y: 0,
        z: 0,
      },
      connectors: [],
    };

    switch (tmpNode.nodeName) {
      case 'breadboardView':

        // console.log('BB', tmpNode.childNodes);
        for (let ib = 0; ib < tmpNode.childNodes.length; ib++) {
          // console.log(tmpNode.childNodes[ib]);
          switch (tmpNode.childNodes[ib].nodeName) {
            case 'geometry':
              // console.log('X', 'Y', tmpNode.childNodes[ib].attributes);
              for (var i = 0; i < tmpNode.childNodes[ib].attributes.length; i++) {
                let tmpAttr = tmpNode.childNodes[ib].attributes[i];
                // console.log(tmpAttr);
                switch (tmpAttr.name) {
                  case 'x':
                    tmpInstanceView.geometry.x = tmpAttr.nodeValue;
                    break;
                  case 'y':
                    tmpInstanceView.geometry.y = tmpAttr.nodeValue;
                    break;
                  case 'z':
                    tmpInstanceView.geometry.z = tmpAttr.nodeValue;
                    break;
                }
              }
              break;

            case 'connectors':
            var tmpCons = tmpNode.childNodes[ib].childNodes;
              // console.log(tmpCons);
              for (let ic = 0; ic < tmpCons.length; ic++) {
                switch (tmpCons[ic].nodeName) {
                  case 'connector':
                    // console.log('CON', tmpCons[ic]);

                    break;
                  default:
                }
              }
              break;
          }
        }
        tmpViews.breadboardView = tmpInstanceView;

        break;
    }
  }

  return tmpViews;
}

module.exports = {FZ, FZBoard, FZProgram, parseFZ};
