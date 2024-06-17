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
  @Output() rightClick = new EventEmitter<{ event: MouseEvent, nodeId: string }>();
  contextMenuVisible: boolean = false;
  contextMenuPosition = { x: 0, y: 0 };
  selectedNodeId: string | null = null;

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
    const newEdge: Edge = {
      id: `e${event.source}-${event.target}`,
      source: event.source,
      target: event.target,
      sourceHandle: event.sourceHandle || null,
      targetHandle: event.targetHandle || null,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    };

    this.edges = addEdge(newEdge, this.edges);
    this.edgesChange.emit(this.edges);
  }

  onRightClick(event: MouseEvent, nodeId?: string) {
    event.preventDefault();
    this.rightClick.emit({ event, nodeId: nodeId || '' });
  }

  onNodeContextMenu(event: any) {
    const { event: mouseEvent, node } = event;
    this.onRightClick(mouseEvent, node.id);
  }
  onDeleteNode() {
    if (this.selectedNodeId) {
      this.nodes = this.nodes.filter(node => node.id !== this.selectedNodeId);
      this.edges = this.edges.filter(edge => edge.source !== this.selectedNodeId && edge.target !== this.selectedNodeId);
      this.contextMenuVisible = false;
      this.selectedNodeId = null;
    }
  }

  onCancelContextMenu() {
    this.contextMenuVisible = false;
    this.selectedNodeId = null;
  }
}
/*this works well
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
  @Output() rightClick = new EventEmitter<{ event: MouseEvent, nodeId: string }>();
  contextMenuVisible: boolean = false;
  contextMenuPosition = { x: 0, y: 0 };
  selectedNodeId: string | null = null;

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
    const newEdge: Edge = {
      id: `e${event.source}-${event.target}`,
      source: event.source,
      target: event.target,
      sourceHandle: event.sourceHandle || null,
      targetHandle: event.targetHandle || null,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    };

    this.edges = addEdge(newEdge, this.edges);
    this.edgesChange.emit(this.edges);
  }

  onRightClick(event: MouseEvent, nodeId?: string) {
    event.preventDefault();
    this.contextMenuVisible = true;
    this.contextMenuPosition = { x: event.clientX, y: event.clientY };
    if (nodeId) {
      this.selectedNodeId = nodeId;
    }
  }

  onNodeContextMenu(event: any) {
    const { event: mouseEvent, node } = event;
    this.onRightClick(mouseEvent, node.id);
  }

  onDeleteNode() {
    if (this.selectedNodeId) {
      this.nodes = this.nodes.filter(node => node.id !== this.selectedNodeId);
      this.edges = this.edges.filter(edge => edge.source !== this.selectedNodeId && edge.target !== this.selectedNodeId);
      this.nodesChange.emit(this.nodes);
      this.edgesChange.emit(this.edges);
      this.contextMenuVisible = false;
      this.selectedNodeId = null;
    }
  }

  onCancelContextMenu() {
    this.contextMenuVisible = false;
    this.selectedNodeId = null;
  }
}*/

/*import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
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

  contextMenuVisible: boolean = false;
  contextMenuPosition = { x: 0, y: 0 };
  selectedNodeId: string | null = null;

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
    const newEdge: Edge = {
      id: `e${event.source}-${event.target}`,
      source: event.source,
      target: event.target,
      sourceHandle: event.sourceHandle,
      targetHandle: event.targetHandle,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    };

    this.edges = addEdge(newEdge, this.edges);
    this.edgesChange.emit(this.edges);
  }
  onRightClick(event: MouseEvent, nodeId?: string) {
    event.preventDefault();
    this.contextMenuVisible = true;
    this.contextMenuPosition = { x: event.clientX, y: event.clientY };
    if (nodeId) {
      this.selectedNodeId = nodeId;
    }
  }

  onDeleteNode() {
    if (this.selectedNodeId) {
      this.nodes = this.nodes.filter(node => node.id !== this.selectedNodeId);
      this.edges = this.edges.filter(edge => edge.source !== this.selectedNodeId && edge.target !== this.selectedNodeId);
      this.nodesChange.emit(this.nodes);
      this.edgesChange.emit(this.edges);
      this.contextMenuVisible = false;
    }
  }

  onCancelContextMenu() {
    this.contextMenuVisible = false;
    this.selectedNodeId = null;
  }
}*/

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
  @Output() addEdge = new EventEmitter<Edge>();

  contextMenuVisible: boolean = false;
  contextMenuPosition = { x: 0, y: 0 };
  selectedNodeId: string | null = null;

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
    const newEdge: Edge = {
      id: `e${event.source}-${event.target}`,
      source: event.source,
      target: event.target,
      sourceHandle: event.sourceHandle,
      targetHandle: event.targetHandle,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    };

    this.edges = addEdge(newEdge, this.edges);
    this.edgesChange.emit(this.edges);
  }
  onRightClick(event: MouseEvent, nodeId?: string) {
    event.preventDefault();
    this.contextMenuVisible = true;
    this.contextMenuPosition = { x: event.clientX, y: event.clientY };
    if (nodeId) {
      this.selectedNodeId = nodeId;
    }
  }


  onDeleteNode() {
    if (this.selectedNodeId) {
      this.nodes = this.nodes.filter(node => node.id !== this.selectedNodeId);
      this.edges = this.edges.filter(edge => edge.source !== this.selectedNodeId && edge.target !== this.selectedNodeId);
      this.nodesChange.emit(this.nodes);
      this.edgesChange.emit(this.edges);
      this.contextMenuVisible = false;
    }
  }
  onCancelContextMenu() {
    this.contextMenuVisible = false;
    this.selectedNodeId = null;
  }
}*/

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
