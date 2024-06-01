import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Node, Edge, Connection, addEdge, MarkerType } from 'reactflow';
@Component({
  selector: 'app-modelling-area',
  templateUrl: './modelling-area.component.html',
  styleUrls: ['./modelling-area.component.css']
})
export class ModellingAreaComponent implements OnChanges {
  @Input() nodes: Node[] = [];
  @Input() edges: Edge[] = [];
  @Output() nodesChange = new EventEmitter<Node[]>();
  @Output() edgesChange = new EventEmitter<Edge[]>();
  @Output() connect = new EventEmitter<Connection>();
  @Output() addEdge = new EventEmitter<Edge>();
  ngOnChanges(changes: SimpleChanges) {
    if (changes['nodes']) {
      this.nodes = changes['nodes'].currentValue;
    }
    if (changes['edges']) {
      this.edges = changes['edges'].currentValue;
    }
  }

  onNodesChange(event: any) {
    const updatedNodes = event.nodes;
    this.nodesChange.emit(updatedNodes);
  }

  onEdgesChange(event: any) {
    const updatedEdges = event.edges;
    this.edgesChange.emit(updatedEdges);
  }
  onConnect(event: any) {
    const params: Connection = {
      source: event.source,
      sourceHandle: event.sourceHandle,
      target: event.target,
      targetHandle: event.targetHandle
    };
    const newEdges = addEdge(params, this.edges);
    this.edges = [...this.edges, ...newEdges];
    this.edgesChange.emit(this.edges);
  }


  /*onConnect(event: any) {
    // Ensure that the event contains the necessary connection information
    const connection: Connection = {
      source: event.source,
      sourceHandle: event.sourceHandle,
      target: event.target,
      targetHandle: event.targetHandle
    };
    this.connect.emit(connection);
  }*/

}



/**import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Node, Edge, Connection, addEdge, MarkerType } from 'reactflow';

@Component({
  selector: 'app-modelling-area',
  templateUrl: './modelling-area.component.html',
  styleUrls: ['./modelling-area.component.css']
})
export class ModellingAreaComponent implements OnChanges {
  @Input() nodes: Node[] = [];
  @Input() edges: Edge[] = [];
  @Output() nodesChange = new EventEmitter<Node[]>();
  @Output() edgesChange = new EventEmitter<Edge[]>();
  @Output() connect = new EventEmitter<Connection>();
  addEdge: any;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['nodes']) {
      this.nodes = changes['nodes'].currentValue;
    }
    if (changes['edges']) {
      this.edges = changes['edges'].currentValue;
    }
  }

  onNodesChange(event: any) {
    const updatedNodes = event.nodes;
    this.nodesChange.emit(updatedNodes);
  }

  onEdgesChange(event: any) {
    const updatedEdges = event.edges;
    this.edgesChange.emit(updatedEdges);
  }

}
*/
  /*@Input() nodes: Node[] = [];
  @Input() edges: Edge[] = [];
  @Output() nodesChange = new EventEmitter<Node[]>();
  @Output() edgesChange = new EventEmitter<Edge[]>();
  @Output() connect = new EventEmitter<Connection>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['nodes']) {
      this.nodes = changes['nodes'].currentValue;
    }
    if (changes['edges']) {
      this.edges = changes['edges'].currentValue;
    }
  }

  onNodesChange(event: any) {
    const updatedNodes = event.nodes;
    this.nodesChange.emit(updatedNodes);
  }

  onEdgesChange(event: any) {
    const updatedEdges = event.edges;
    this.edgesChange.emit(updatedEdges);
  }
}*/
