import * as fs from "fs";
import * as path from "path";
import { parse } from "@babel/parser";

const extFilter = "ts";
const dirPath = "vscode/src";

type Deps = {
  from: String;
  to: String;
};

function main() {
  const files = listFiles(dirPath);
  let depsList: Deps[] = [];
  for (const file of files) {
    depsList = depsList.concat(parseFile(file));
  }

  const outputFile = "result.edgelist";
  const stream = fs.createWriteStream(outputFile);
  for (const deps of depsList) {
    stream.write(`${deps.from} ${deps.to}\n`);
  }
  stream.end();
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
