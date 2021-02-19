import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [_file, _setFile] = useState();
  const [_result, _setResult] = useState(null);
  const _el = useRef();

  const _onFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    _setFile(file);
  };

  const _uploadFile = async (event) => {
    event.preventDefault();
    console.log("submit");

    console.log("file", _file);

    const formData = new FormData();
    formData.append("upload", _file);

    const r = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    });

    _setResult(await r.json());

    // let formData = new FormData()
    //formData.append(e.target.files[0])
  };

  const { dirname } = _result;
  const { mtime, name, path, size, type } = _result.files.upload;

  return (
    <>
      <div className="file-upload">
        <input
          type="file"
          ref={_el}
          onChange={_onFileChange}
          name="someExpressFiles"
        />
        <button onClick={_uploadFile}>upload</button>
      </div>
      {_result ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>key</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>dirname</td>
                <td>{dirname}</td>
              </tr>
              <tr>
                <td>mtime</td>
                <td>{mtime}</td>
              </tr>
              <tr>
                <td>name</td>
                <td>{name}</td>
              </tr>
              <tr>
                <td>path</td>
                <td>{path}</td>
              </tr>
              <tr>
                <td>size</td>
                <td>{size}</td>
              </tr>
              <tr>
                <td>type</td>
                <td>{type}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}

export default App;

/*

<div>
      <h2>Test GET</h2>
      <Test />
      <h2>
        With <code>"express"</code> npm package
      </h2>
      <form onSubmit={_onSubmit} encType="multipart/form-data">
        <div>
          Text field title: <input type="text" name="title" />
        </div>
        <div>
          File:{" "}
          <input
            type="file"
            ref={_el}
            name="someExpressFiles"
            multiple="multiple"
          />
        </div>
        <input type="submit" value="Upload" />
      </form>
    </div>

    */
