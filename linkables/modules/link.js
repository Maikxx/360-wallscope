let linkables = Array()

const link = (ev,el)=>{

    if(!linkables.find(arrEl=>{return arrEl === el})){
        linkables.push(el)
    }else{
        linkables.find((arrEl,i)=>{
            linkReset([arrEl])
        })
    }

    if(linkables[1]){
        if(linkables[0].getAttribute("data-link")){
            if(!(linkables[0].getAttribute("data-link").match(linkables[1].id))){
                linkData(linkables)
                linkReset(linkables)
                console.log("Link made")
            }else{
                linkReset(linkables)
                console.log("Link not made: already exists")
            }
        }else{
            linkData(linkables)
            linkReset(linkables) 
            console.log("Link made")
        }
    }
}

const linkReset = (arr)=>{
    console.log("cleared",arr)
    arr.forEach(el=>{
        el.classList.remove("linking")
    })
    linkables = []
}

const linkData = arr=>{
    const data = arr.map(el=>{
        return {
            "el":el,
            "height": el.clientHeight,
            "width": el.clientWidth,
            "x": (el.offsetLeft) + el.clientWidth/2,
            "y": (el.offsetTop) + el.clientHeight/2,
            "id": el.id,
            "links": el.getAttribute("data-link") 
            ? el.getAttribute("data-link") 
            : ""  
        }
    })

    arr[0].setAttribute("data-link",`${data[1].id} ${data[0].links}`)
    arr[1].setAttribute("data-link",`${data[0].id} ${data[1].links}`)
    

    linkCreate([[data[0],data[1]]])
}

const linkCreate = arr=>{
    const namespace = "http://www.w3.org/2000/svg"
    arr.forEach(el => {
        const newGroup = document.createElementNS(namespace,"g")
        const svgContainer = document.querySelector(".svg__container")

        newGroup.classList.add("link--confirmed")

        newGroup.id = `${el[0].id}_to_${el[1].id}`

        switch (true) {
            case el[0].x == el[1].x:
                (()=>{
                    const newCircleStart = document.createElementNS(namespace,"circle")
                    const newCircleEnd = document.createElementNS(namespace,"circle")
                    const newLine = document.createElementNS(namespace,"line")
                    newCircleStart.setAttribute("r",5)
                    newCircleEnd.setAttribute("r",5)
                    newCircleStart.setAttribute("cx",
                        el[0].y > el[1].y 
                        ? linkSpacing(el[0].el,"check")[0] * 20 + el[0].x 
                        : linkSpacing(el[0].el,"check")[2] * 20 + el[0].x)
                    newCircleEnd.setAttribute("cx",
                        el[0].y < el[1].y 
                        ? linkSpacing(el[1].el,"check")[0] * 20 + el[1].x 
                        : linkSpacing(el[1].el,"check")[2] * 20 + el[1].x)
                    newCircleStart.setAttribute("cy",
                        el[0].y > el[1].y 
                        ? el[0].y - el[0].height/2 
                        : el[0].y + el[0].height/2)
                    newCircleEnd.setAttribute("cy",
                        el[0].y < el[1].y 
                        ? el[1].y - el[1].height/2 
                        : el[1].y + el[1].height/2)
                    
                    newLine.setAttribute("x1",
                        el[0].y > el[1].y 
                        ? linkSpacing(el[0].el,"check")[0] * 20 + el[0].x 
                        : linkSpacing(el[0].el,"check")[2] * 20 + el[0].x)
                    newLine.setAttribute("x2",
                        el[0].y > el[1].y 
                        ? linkSpacing(el[0].el,"check")[0] * 20 + el[0].x 
                        : linkSpacing(el[0].el,"check")[2] * 20 + el[0].x)

                    newLine.setAttribute("y1",
                        el[0].y > el[1].y 
                        ? el[0].y - el[0].width/2
                        : el[0].y + el[0].width/2)
                    newLine.setAttribute("y2",
                        el[0].y < el[1].y 
                        ? el[1].y - el[1].width/2
                        : el[1].y + el[1].width/2)

                    linkSpacing(el[0].el,"tb",el[0].y > el[1].y)
                    linkSpacing(el[1].el,"tb",el[0].y < el[1].y)

                    newGroup.appendChild(newLine)
                    newGroup.appendChild(newCircleStart)
                    newGroup.appendChild(newCircleEnd)
                })()
                break
            case el[0].y == el[1].y:
                (()=>{
                    const newCircleStart = document.createElementNS(namespace,"circle")
                    const newCircleEnd = document.createElementNS(namespace,"circle")
                    const newLine = document.createElementNS(namespace,"line")
                    newCircleStart.setAttribute("r",5)
                    newCircleEnd.setAttribute("r",5)
                    newCircleStart.setAttribute("cx",
                        el[0].x > el[1].x 
                        ? el[0].x - el[0].width/2 
                        : el[0].x + el[0].width/2)
                    newCircleEnd.setAttribute("cx",
                        el[0].x < el[1].x 
                        ? el[1].x - el[1].width/2 
                        : el[1].x + el[1].width/2)
                    newCircleStart.setAttribute("cy",el[0].y)
                    newCircleEnd.setAttribute("cy",el[1].y)

                    linkSpacing(el[0].el,"lr",el[0].x > el[1].x)
                    linkSpacing(el[1].el,"lr",el[0].x < el[1].x)

                    newLine.setAttribute("y1",el[0].y)
                    newLine.setAttribute("y2",el[1].y)

                    newLine.setAttribute("x1",
                        el[0].x > el[1].x
                        ? el[0].x - el[0].height/2 
                        : el[0].x + el[0].height/2)
                    newLine.setAttribute("x2",
                        el[0].x < el[1].x
                        ? el[1].x - el[1].height/2 
                        : el[1].x + el[1].height/2)
                    
                    newGroup.appendChild(newLine)
                    newGroup.appendChild(newCircleStart)
                    newGroup.appendChild(newCircleEnd)
                })()
                break
            default:
                (()=>{
                    const newCircleStart = document.createElementNS(namespace,"circle")
                    const newCircleEnd = document.createElementNS(namespace,"circle")
                    const newLine = document.createElementNS(namespace,"line")
                    newCircleStart.setAttribute("r",5)
                    newCircleEnd.setAttribute("r",5)

                    newCircleStart.setAttribute("cx",
                        el[0].x > el[1].x
                        ? el[0].x - el[0].height/2 
                        : el[0].x + el[0].height/2)
                    newCircleEnd.setAttribute("cx",
                        el[0].x < el[1].x
                        ? el[1].x - el[1].height/2 
                        : el[1].x + el[1].height/2)
                    newCircleStart.setAttribute("cy",
                        el[0].y > el[1].y
                        ? el[0].y - el[0].height/2 
                        : el[0].y + el[0].height/2)
                    newCircleEnd.setAttribute("cy",
                        el[0].y < el[1].y
                        ? el[1].y - el[1].height/2 
                        : el[1].y + el[1].height/2)

                    newLine.setAttribute("y1",el[0].y)
                    newLine.setAttribute("y2",el[1].y)

                    newLine.setAttribute("x1",
                        el[0].x > el[1].x
                        ? el[0].x - el[0].height/2 
                        : el[0].x + el[0].height/2)
                    newLine.setAttribute("x2",
                        el[0].x < el[1].x
                        ? el[1].x - el[1].height/2 
                        : el[1].x + el[1].height/2)
                    newLine.setAttribute("y1",
                        el[0].y > el[1].y
                        ? el[0].y - el[0].height/2 
                        : el[0].y + el[0].height/2)
                    newLine.setAttribute("y2",
                        el[0].y < el[1].y
                        ? el[1].y - el[1].height/2 
                        : el[1].y + el[1].height/2)

                    newGroup.appendChild(newLine)
                    newGroup.appendChild(newCircleStart)
                    newGroup.appendChild(newCircleEnd)
                })()
                break
        }

        svgContainer.appendChild(newGroup)
        
    })
}

const linkSpacing = (obj,type,bool)=>{
    switch(type){
        case "tb":
                if(obj.getAttribute("data-spacing")){
                    let spacing = obj.getAttribute("data-spacing").split("|").map(str => Number(str))
                    bool ? spacing[0]++ : spacing[2]++
                    obj.setAttribute("data-spacing",spacing.join("|"))
                }else{
                    obj.setAttribute("data-spacing",`${bool==true?1:0}|0|${bool!=true?1:0}|0`)
                }

            break
        case "lr":
            if(obj.getAttribute("data-spacing")){
                let spacing = obj.getAttribute("data-spacing").split("|").map(str => Number(str))
                bool ? spacing[1]++ : spacing[3]++
                obj.setAttribute("data-spacing",spacing.join("|"))
            }else{
                obj.setAttribute("data-spacing",`0|${bool==true?1:0}|0|${bool!=true?1:0}`)
            }
        case "check":
                if(obj.getAttribute("data-spacing")){
                    let spacing = obj.getAttribute("data-spacing").split("|").map(str => Number(str))
                    return spacing
                }else{
                    return [0,0,0,0]
                }
    }
}

export {link,linkCreate}