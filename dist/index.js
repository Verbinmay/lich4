"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const jsonBodyMiddleware = body_parser_1.default.json();
app.use(jsonBodyMiddleware);
app.use('/blogs', blogsRouter);
app.use('/posts', postsRouter);
app.delete("/testing/all-data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield blogsCollections.deleteMany({});
    let result1 = yield postsCollections.deleteMany({});
    res.send(204);
}));
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield runDb();
    app.listen(port, () => {
        console.log("Example app listening on port: ${port}");
    });
});
startApp();
