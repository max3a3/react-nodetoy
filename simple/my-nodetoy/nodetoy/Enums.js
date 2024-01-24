
var MessageEnum;
// var i = n(49379);

!function (e) {
    // setting enum
    e[e.Message = 0] = "Message";
    e[e.SetMaterial = 1] = "SetMaterial";
    e[e.RemoveMaterial = 2] = "RemoveMaterial";
    e[e.SetMaterialConfiguration = 3] = "SetMaterialConfiguration";
    e[e.SetMaterialFunction = 4] = "SetMaterialFunction";
    e[e.SetMaterialFunctions = 5] = "SetMaterialFunctions";
    e[e.RemoveMaterialFunction = 6] = "RemoveMaterialFunction";
    e[e.RemoveMaterialFunctions = 7] = "RemoveMaterialFunctions";
    e[e.CreateNodes = 8] = "CreateNodes";
    e[e.UpdateNodes = 9] = "UpdateNodes";
    e[e.RemoveNodes = 10] = "RemoveNodes";
    e[e.SetConnections = 11] = "SetConnections";
    e[e.UnsetConnections = 12] = "UnsetConnections";
    e[e.UpdateMaterialChannels = 13] = "UpdateMaterialChannels";
    e[e.MasterCompiled = 14] = "MasterCompiled";
    e[e.MasterChannelsCompiled = 15] = "MasterChannelsCompiled";
    e[e.NodesCompiled = 16] = "NodesCompiled";
    e[e.NodesReflected = 17] = "NodesReflected";
}(MessageEnum || (MessageEnum = {}));

var DataTypeEnum;
var PortQualifierEnum;
var CastEnum;
var SamplerTypeEnum;

var c = n(90581);
var _instanceOf = n(70865);
var d = n(50930);
var NodeBuilder = n(84484);

var PrimitiveTypes = ["Int", "Float", "Vector2", "Vector3", "Vector4", "Color", "Matrix3", "Matrix4", "Gradient"];
var SystemNodeTypes = ["SinTime", "CosTime", "DeltaTime", "Split", "PointerDown", "PointerUp"];

var isPrimitiveType = function (e) {
    return PrimitiveTypes.includes(e);
};

var isOpaqueRenderType = function (e) {
    return "opaque" === e.renderType;
};

var g = n(66383);

!function (e) {
    e[e.None = 0] = "None";
    e.String = "String";
    e.Bool = "Bool";
    e.Float = "Float";
    e.Int = "Int";
    e.Vector2 = "Vector2";
    e.Vector3 = "Vector3";
    e.Vector4 = "Vector4";
    e.Color = "Color";
    e.Matrix3 = "Matrix3";
    e.Matrix4 = "Matrix4";
    e.Code = "Code";
    e.List = "List";
    e.Select = "Select";
    e.Depend = "Depend";
}(DataTypeEnum || (DataTypeEnum = {}));

(function (e) {
    e[e.In = 0] = "In";
    e[e.Out = 1] = "Out";
    e[e.InOut = 2] = "InOut";
})(PortQualifierEnum || (PortQualifierEnum = {}));

(function (e) {
    e[e.Default = 0] = "Default";
    e[e.Strict = 1] = "Strict";
})(CastEnum || (CastEnum = {}));

(function (e) {
    e[e.OBJECT = 2] = "OBJECT";
    e[e.FLOAT = 4] = "FLOAT";
    e[e.FLOAT2 = 8] = "FLOAT2";
    e[e.FLOAT3 = 16] = "FLOAT3";
    e[e.FLOAT4 = 32] = "FLOAT4";
    e[e.FLOAT3x3 = 64] = "FLOAT3x3";
    e[e.FLOAT4x4 = 128] = "FLOAT4x4";
    e[e.COLOR = 256] = "COLOR";
    e[e.INT = 512] = "INT";
    e[e.SAMPLER1D = 1024] = "SAMPLER1D";
    e[e.SAMPLER2D = 2048] = "SAMPLER2D";
    e[e.SAMPLER3D = 4096] = "SAMPLER3D";
    e[e.SAMPLERCUBE = 8192] = "SAMPLERCUBE";
    e[e.UINT = 16384] = "UINT";
    e[e.SAMPLER2DARRAY = 32768] = "SAMPLER2DARRAY";
    e[e.SAMPLERSTATE = 65536] = "SAMPLERSTATE";
    e[e.BOOL = 131072] = "BOOL";
})(SamplerTypeEnum || (SamplerTypeEnum = {}));

var NodeCategoryEnum;

var _;

var DataTypeEnum;
var PortInputDataType;
var CustomExpressionOutputTypeEnum;
var CustomExpressionTypeEnum;
var SamplerInputType = [SamplerTypeEnum.SAMPLER2D];
var AnyInputType = [SamplerTypeEnum.OBJECT, SamplerTypeEnum.FLOAT, SamplerTypeEnum.FLOAT2, SamplerTypeEnum.FLOAT3, SamplerTypeEnum.FLOAT4, SamplerTypeEnum.COLOR, SamplerTypeEnum.INT, SamplerTypeEnum.FLOAT3x3, SamplerTypeEnum.FLOAT4x4];
var NumberOrMatrixInputType = [SamplerTypeEnum.FLOAT, SamplerTypeEnum.FLOAT2, SamplerTypeEnum.FLOAT3, SamplerTypeEnum.FLOAT4, SamplerTypeEnum.COLOR, SamplerTypeEnum.INT, SamplerTypeEnum.FLOAT3x3, SamplerTypeEnum.FLOAT4x4];
var StrictNumberInputType = [SamplerTypeEnum.OBJECT, SamplerTypeEnum.FLOAT, SamplerTypeEnum.FLOAT2, SamplerTypeEnum.FLOAT3, SamplerTypeEnum.FLOAT4, SamplerTypeEnum.COLOR, SamplerTypeEnum.INT];
var OnlyNumberInputType = [SamplerTypeEnum.FLOAT, SamplerTypeEnum.FLOAT2, SamplerTypeEnum.FLOAT3, SamplerTypeEnum.FLOAT4, SamplerTypeEnum.COLOR, SamplerTypeEnum.INT];
!function (e) {
    e.Hidden = "_";
    e.Comment = "Annotation";
    e.Camera = "Camera";
    e.Constant = "Inputs & Constants";
    e.Custom = "Custom";
    e.Time = "Time";
    e.Textures = "Textures";
    e.UV = "UV Coordinates";
    e.Trigonometry = "Trigonometry Operators";
    e.ImageEffects = "Image Effects";
    e.Math = "Math Operators";
    e.Lights = "Lights";
    e.Logic = "Logical Operators";
    e.Matrix = "Matrix Operators";
    e.MatrixTransform = "Matrix Transform";
    e.ObjectTransform = "Object Transform";
    e.Vector = "Vector Operators";
    e.Shape = "Shapes";
    e.Surface = "Surface";
    e.Misc = "Miscellaneous";
    e.Noises = "Noises";
    e.Vertex = "Vertex";
    e.Functions = "Functions";
    e.Vars = "Variables";
    e.Patterns = "Patterns";
    e.Events = "Events";
    e.Normals = "Normals";
    e._noises = "noises";
    e._patterns = "patterns";
    e._filters = "filters";
    e._effects = "effects";
    e._utilities = "utilities";
    e._masks = "masks";
    e._others = "others";
}(NodeCategoryEnum || (NodeCategoryEnum = {}));

(function (e) {
    e[e.Unknown = 0] = "Unknown";
    e.Constant = "Constant";
    e.Property = "Property";
})(_ || (_ = {}));

(function (e) {
    e.Int = "Int";
    e.Float = "Float";
    e.Color = "Color";
    e.Vector2 = "Vector2";
    e.Vector3 = "Vector3";
    e.Vector4 = "Vector4";
    e.Matrix3 = "Matrix3";
    e.Matrix4 = "Matrix4";
    e.Texture = "Texture";
    e.TextureObject = "TextureObject";
})(DataTypeEnum || (DataTypeEnum = {}));

(function (e) {
    e.Int = "Int";
    e.Float = "Float";
    e.Vector2 = "Vector2";
    e.Vector3 = "Vector3";
    e.Vector4 = "Vector4";
    e.Matrix3 = "Matrix3";
    e.Matrix4 = "Matrix4";
})(PortInputDataType || (PortInputDataType = {}));

(function (e) {
    e.Int = "Int";
    e.Float = "Float";
    e.Vector2 = "Vector2";
    e.Vector3 = "Vector3";
    e.Vector4 = "Vector4";
    e.Matrix3 = "Matrix3";
    e.Matrix4 = "Matrix4";
})(CustomExpressionOutputTypeEnum || (CustomExpressionOutputTypeEnum = {}));

(function (e) {
    e.Int = "Int";
    e.Float = "Float";
    e.Vector2 = "Vector2";
    e.Vector3 = "Vector3";
    e.Vector4 = "Vector4";
    e.Matrix3 = "Matrix3";
    e.Matrix4 = "Matrix4";
    e.TextureObject = "TextureObject";
})(CustomExpressionTypeEnum || (CustomExpressionTypeEnum = {}));
