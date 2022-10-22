import * as fs from "fs";
import * as path from "path";
import { parse } from "@babel/parser";

const extFilter = "ts";
const dirPath = "vscode/src";

type Deps = {
  from: String;
  to: String;
};

type DepsWithIds = {
  from: Number;
  to: Number;
};

function main() {
  const files = listFiles(dirPath);
  let depsList: Deps[] = [];
  for (const file of files) {
    depsList = depsList.concat(parseFile(file));
  }

  const parsedDepsInfo = parseDepsList(depsList);

  const edgelistFileName = "result.edgelist";
  const edgelistStream = fs.createWriteStream(edgelistFileName);
  for (const deps of parsedDepsInfo.depsListWithNodeIds) {
    edgelistStream.write(`${deps.from} ${deps.to}\n`);
  }
  edgelistStream.end();

  const nodeIdMappingFileName = "node_ids.txt";
  const nodeIdMappingStream = fs.createWriteStream(nodeIdMappingFileName);
  nodeIdMappingStream.write("id,name\n");
  for (const deps of parsedDepsInfo.nodeIdsAndNamesMapping) {
    nodeIdMappingStream.write(`${deps.id},${deps.name}\n`);
  }
  nodeIdMappingStream.end();
}

type Node = {
  id: Number;
  name: String;
};

function parseDepsList(depsList: Deps[]) {
  const nodeIdsAndNamesMapping: Node[] = [];

  let i = 0;
  for (const deps of depsList) {
    const from = nodeIdsAndNamesMapping.find((elem) => elem.name === deps.from);
    if (from === undefined) {
      nodeIdsAndNamesMapping.push({
        id: i,
        name: deps.from,
      });
      i++;
    }

    const to = nodeIdsAndNamesMapping.find((elem) => elem.name === deps.to);
    if (to === undefined) {
      nodeIdsAndNamesMapping.push({
        id: i,
        name: deps.to,
      });
      i++;
    }
  }

  // edgelistをidに変換
  const depsListWithNodeIds: DepsWithIds[] = [];
  for (const deps of depsList) {
    const fromNode = nodeIdsAndNamesMapping.find((elem) => elem.name == deps.from);
    if (fromNode === undefined) {
      throw new Error("nodeのidが見つかりませんでした");
    }

    const toNode = nodeIdsAndNamesMapping.find((elem) => elem.name == deps.to);
    if (toNode === undefined) {
      throw new Error("nodeのidが見つかりませんでした");
    }

    depsListWithNodeIds.push({
      from: fromNode.id,
      to: toNode.id,
    });
  }

  return {
    nodeIdsAndNamesMapping: nodeIdsAndNamesMapping,
    depsListWithNodeIds: depsListWithNodeIds,
  };
}

function extension(element: string) {
  var extName = path.extname(element);
  return extName === "." + extFilter;
}

const listFiles = (dir: string): string[] => {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((dirent) => (dirent.isFile() ? [`${dir}/${dirent.name}`] : listFiles(`${dir}/${dirent.name}`)))
    .filter(extension);
};

function parseFile(filePath: fs.PathOrFileDescriptor) {
  const code = fs.readFileSync(filePath, "utf-8");
  const ast = parse(code, {
    allowUndeclaredExports: true,
    sourceType: "module",
    plugins: ["typescript", "decorators"],
    errorRecovery: true,
  });

  const depsList: Deps[] = [];
  for (const node of ast.program.body) {
    if (node.type == "ImportDeclaration") {
      depsList.push({
        from: formatFilePath(filePath.toString()),
        to: node.source.value.replace(/\..*/, ""),
      });
    }
  }

  return depsList;
}

function formatFilePath(filePath: String) {
  return filePath
    .replace(dirPath + "/", "")
    .replace("." + extFilter, "")
    .replace(/\..*/, "");
}

// fs.writeFileSync(__dirname + "/result.json", JSON.stringify(ast));

main();
