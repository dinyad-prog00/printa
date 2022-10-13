import { useState } from "react"
import { File, FiletypeJs, FiletypePy, Folder } from "react-bootstrap-icons"

import { FiletypeCss } from "react-bootstrap-icons"
import { FiletypeHtml } from "react-bootstrap-icons"
import PrintEditor from "./components/Editor/PrintaEditor"


export const filesMap = {
    id: 1,
    name: "home",
    isFolder: true,
    isOpen: false,
    children: [
        {
            id: 2,
            name: "Documents",
            isFolder: true,
            isOpen: true,
            children: [
                {
                    id: 5,
                    name: "Node",
                    isFolder: true,
                    isOpen: true,
                    children: [
                        {
                            id: 7,
                            name: "style.css",
                            isFolder: false, isOpen: false,

                            children: []

                        }
                    ]

                }
                , {
                    id: 6,
                    name: "index.js",
                    isFolder: false, isOpen: false,

                    children: []

                }
            ]

        },
        {
            id: 3,
            name: "Bureau",
            isFolder: true,
            isOpen: false,
            children: [{
                id: 8,
                name: "Films",
                isFolder: true,
                isOpen: false,
                children: []

            }]

        },
        {
            id: 4,
            name: "template.html",
            isFolder: false, isOpen: false,

            children: []

        },
        {
            id: 10,
            name: "code.py",
            isFolder: false, isOpen: false,

            children: []

        }
    ]


}

export const FileIcon = ({ name }) => {
    var i = name.indexOf(".");
    const ext = name.substr(i + 1);

    if (ext == "html") {
        return <FiletypeHtml color="orange" />
    }
    else if (ext == "css") {
        return <FiletypeCss color="orange" />
    }
    else if (ext == "js") {
        return <FiletypeJs color="orange" />
    }
    else if (ext == "py") {
        return <FiletypePy color="orange" />
    } else {
        return <File color="orange" />
    }


}
export const FileTree = ({ files }) => {
    const [open, setOpen] = useState(files.isOpen)

    return <div className="pt-1">
        {files.isFolder && <div className="text-success" onClick={() => setOpen(!open)}>
            <Folder className="me-1" />
            <a href="#" className="text-decoration-none text-truncate">{files.name}</a>
        </div>}
        {!files.isFolder && <div className="pt-1">
            <FileIcon name={files.name} />
            <a href="#" className="text-decoration-none text-white text-truncate" >{files.name}</a>
        </div>}
        {open && <div className="ps-2 border-start border-info">
            {
                files.children.map((f) =>
                    <FileTree files={f} />
                )


            }

            {files.children.length == 0 && <span className="text-white">...</span>}

        </div>
        }
    </div>
}

export const TestMutli = () => {
    return <div className="row">
        <div className="col" key={1}>
            <PrintEditor />
        </div>
        <div className="col" key={2}>
            <PrintEditor />
        </div>
    </div>
}

