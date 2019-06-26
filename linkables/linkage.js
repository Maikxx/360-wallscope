import {link,linkCreate} from "./modules/link.js"

let linking = false

const lineContainer = document.querySelector("#line__container")
const items = lineContainer.querySelectorAll(".board__items > *")
const svgContainer = document.createElementNS("http://www.w3.org/2000/svg","svg")
const menuButton = document.querySelector("#Menu-open")

localStorage.getItem("link-mode")?localStorage.getItem("link-mode"):localStorage.setItem("link-mode","link--confirmed")
document.body.classList.add(localStorage.getItem("link-mode")?localStorage.getItem("link-mode"):"link--confirmed")

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

        menuButton.addEventListener("change",(e)=>{
            linking = linking === true ? false : true
            document.body.classList.toggle("disabled")
        })

        items.forEach(el=>{
            el.addEventListener("click",e=>{
                linking && el.classList.add("linking")
                linking && link(e,el)
            })
            el.addEventListener("mouseover",e=>{
                if(el.getAttribute("data-link") && !el.classList.contains("hover")){
                    const links = el.getAttribute("data-link").split(" ")
                    links.forEach(link=>{
                        if(link.length > 5){

                            document.querySelector(`#${link}`).classList.add("active")

                            document.querySelector(`#${link}_to_${el.id}`) 
                            ? document.querySelector(`#${link}_to_${el.id}`).classList.add("active")
                            : document.querySelector(`#${el.id}_to_${link}`).classList.add("active")
                        }
                    })
                }
                el.classList.add("hover")
            })
            el.addEventListener("mouseout",e=>{
                el.classList.remove("hover")
                const actives = document.querySelectorAll(".active")
                actives.forEach(active=>{
                    active.classList.remove("active")
                })
            })
        })

        app.contextUser()
        app.controls()
        linkCreate(app.formatLinks())
    },
    formatLinks:()=>{
        let arr = Array.from(document.querySelectorAll("[data-link]"))
        let linkSet = []
        let linkData = []

        arr = arr.map(el=>{
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

        return linkData
    },
    controls:()=>{
        const controls = document.querySelectorAll(".Menu-item")

        controls.forEach(control=>{
            control.addEventListener("click",e=>{
                localStorage.setItem("link-mode",control.id)
                document.body.className = control.id
            })
            if(control.checked){
                localStorage.setItem("link-mode",control.id)
                document.body.className = control.id
            }
        })
    },
    contextUser:()=>{
        const name = "fullname"
        const context = document.querySelector(".Button span")
        context.innerText = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }
}
app.init()
