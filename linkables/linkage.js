import {link,linkCreate} from "./modules/link.js"

let linking = true

let mode = "Linking"

const lineContainer = document.querySelector("#line__container")
const itemContainer = lineContainer.querySelector(".board__items")
const items = itemContainer.querySelectorAll("*")
const svgContainer = document.createElementNS("http://www.w3.org/2000/svg","svg")

items.forEach((el,i)=>{
    el.id = `block-${i}`
    el.classList.add("item")
})

const app = {
    init:()=>{
        svgContainer.setAttribute("height",`${lineContainer.clientHeight}`)
        svgContainer.setAttribute("width",`${lineContainer.clientWidth}`)

        svgContainer.classList.add("svg__container")
        lineContainer.appendChild(svgContainer)

        items.forEach(el=>{
            el.addEventListener("click",(e)=>{
                linking && link(e,el)
            })
        })

        let arr = Array.from(document.querySelectorAll("[data-link]"))
        let linkSet = []
        let linkData = []

        arr = arr.map((el)=>{
                return {
                    "el":el,
                    "height": el.clientHeight,
                    "width": el.clientWidth,
                    "x": (el.offsetLeft) + el.clientWidth/2,
                    "y": (el.offsetTop) + el.clientHeight/2,
                    "id": el.id,
                    "links": el.getAttribute("data-link") ? el.getAttribute("data-link") : ""  
                }
            }
        )

        arr.forEach((data,i)=>{
            data.links.split(" ").forEach(value=>{
                if(linkSet.length > 0){
                    if(!(linkSet.find((el)=>{
                        return el == [data.id,value].sort().toString()
                    }))){
                        linkSet.push([data.id,value].sort())
                    }
                }else{
                    linkSet.push([data.id,value].sort())
                }              
            })
        })

        linkData = linkSet.map(el=>{  
            return [arr.find(value=>{
                return value.id == el[0]
             }),arr.find(value=>{
                return value.id == el[1]
             })]
        })
      
        linkCreate(linkData)
    }
}

app.init()