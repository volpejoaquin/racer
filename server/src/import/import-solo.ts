// libs
import * as fs from 'fs';
import * as xmlParser from 'xml-js';
import * as lodash from 'lodash';

// models
import { BaseImporter } from './base-import';

const maxLng = 0;
const maxLat = 0;
const maxAlt = 0;
const minLng = 999999;
const minLat = 999999;
const minAlt = 999999;
const scale = 300;
const correction = 0;

export class SoloImporter extends BaseImporter {

  private lookAt = {};
  private coordinates = [];

  constructor(filePath: string, destPath: string) {
    super(filePath, destPath);

    this.importFile();
  }
  
  // private methods
  private importFile(): void {
    console.log('Importing file...');
    
    if (!this.filePath) {
      console.log('ERROR: INVALID FILE.');
      return;
    }

    const xmlFileContent: any = fs.readFileSync(this.filePath),
      options = {ignoreComment: true, alwaysChildren: true},
      result = xmlParser.xml2js(xmlFileContent, options);

    if (result && result.elements) {
      this.parseElements(result.elements, null);
    }

    console.log('------------------');
    console.log('File imported !');
    console.log('Look at:', this.lookAt);
    console.log('Coordinates count: ' + this.coordinates.length);
  }

  private parseElements(elements: any, parent: any) {
    elements.forEach((element: any) => {
      this.parseElement(element, parent);
    });
  }

  private parseElement(element: any, parent: any) {
    const log = false;

    if (log) {
      console.log('ELEMENT ----->');
      if (element.type) {
        console.log('Type: ' + element.type);
      }
      if (element.name) {
        console.log('Name: ' + element.name);
      }
      if (element.text) {
        console.log('Text: ' + element.text.substring(0, 100) + '...');
      }
      console.log('------------>');
    }

    // Check coordinates
    if (parent && parent.name === 'coordinates' && element.text) {
      this.coordinates = this.extractChords(element.text);

      this.saveCoordinates(this.coordinates);
    }
    
    // Check look at
    if (parent && parent.name === 'LookAt') {

      if (element.elements) {
        let content = parseFloat(element.elements[0].text);
        this.lookAt[element.name] = content;
      }
    } else {
      if (element.elements) {
        this.parseElements(element.elements, element);
      }
    }
  }

  private extractChords(elementText) {
    const lines = elementText.split('\n');
    const response = [];
    let lineString,
      coords,
      coordinate;

    lines.forEach((line: any) => {
      lineString = line.trim();
      coords = lineString.split(',');

      if (lineString && lineString != '' && coords.length === 3) {
  
        coordinate = {
          x: this.generateChord('x', coords[0]),
          y: this.generateChord('y', coords[0]),
          z: this.generateChord('z', coords[0])
        };
        
        response.push(coordinate);
      }
    });

    return response;
  }

  private generateChord(label: string, value: any): number {
    const scale = 100;
    let offset;
    let response;

    if (value) {
      value = parseFloat(value) * scale;
      
      if (value < 0) {
        value *= -1;
      }

      offset = Math.trunc(value);

      response = value + offset;
    } else {
      response = 0;
    }

    return response;
  }

  private test(elementText) {
    const lines = elementText.split('\n');
    const response = [];
    let height = (
      3963.0 * Math.acos(
        Math.sin(maxLat/57.2958) * 
        Math.sin(minLat/57.2958) + Math.cos(maxLat/57.2958) * 
        Math.cos(minLat/57.2958) * Math.cos(minLng/57.2958 - minLng/57.2958)
      )
    );
    let width = (
      3963.0 * Math.acos(
        Math.sin(maxLat/57.2958) *
        Math.sin(maxLat/57.2958) + Math.cos(maxLat/57.2958) * 
        Math.cos(maxLat/57.2958) * 
        Math.cos(maxLng/57.2958 - minLng/57.2958)
      )
    );
    let xdiff = height * 0.025 * scale;
    let ydiff = width * 0.025 * scale;
    
    let x, y, previousX, previousY, lat, lng, lineString, coords;

    lines.forEach(function(line, i) {
      lineString = line.trim();
      coords = lineString.split(',');
      lat = coords[0];
      lng = coords[1];
  
      y = (3963.0 * Math.acos(Math.sin(maxLat/57.2958) * Math.sin(lat/57.2958) + Math.cos(maxLat/57.2958) * Math.cos(lat/57.2958) *  Math.cos(minLng/57.2958 - minLng/57.2958)));
      x = (3963.0 * Math.acos(Math.sin(maxLat/57.2958) * Math.sin(maxLat/57.2958) + Math.cos(maxLat/57.2958) * Math.cos(maxLat/57.2958) *  Math.cos(lng/57.2958 - minLng/57.2958)));

      previousX = (x*scale) + xdiff;
      previousY = (y*scale) + ydiff;

      response.push({
        y: previousY,
        x: previousX,
        z: 0
      });
    });

    return response;
  }

  private saveCoordinates(coordinates) {
    const fileContent = 'export const SOLO_DATA = ' + JSON.stringify(coordinates) + ';';


    fs.writeFile(this.destPath, fileContent, (err) => {
      if (err) throw err;
  
      console.log("The file was succesfully saved!");
  }); 
  }
}
