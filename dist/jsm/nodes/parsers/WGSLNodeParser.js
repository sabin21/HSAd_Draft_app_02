import NodeParser from"../core/NodeParser.js";import WGSLNodeFunction from"./WGSLNodeFunction.js";class WGSLNodeParser extends NodeParser{parseFunction(e){return new WGSLNodeFunction(e)}}export default WGSLNodeParser;