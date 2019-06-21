(()=>{
    const app = {
        init:()=>{
            console.log("booting")
            const lineContainer = document.querySelector("#line__container")
            const blocks = lineContainer.querySelectorAll("li")


            const svgContainer = document.createElementNS("","svg")
            

            let linking = false

            svgContainer.setAttribute("height",blocksContainer.clientHeight)
            svgContainer.setAttribute("width",blocksContainer.clientWidth)

            blocks.forEach((el,i)=>{
                el.setAttribute("data-blockID",`block-${i}`)
                el.addEventListener("click",(e)=>{
                    el.classList.toggle("linking")
                    try{
                        if(document.querySelectorAll(".linking").length === 2){
                            let elements = document.querySelectorAll(".linking")
                            document.querySelectorAll(".linking").forEach((el)=>{
                                el.classList.remove("linking")
                                el.classList.add("linked")
                            })
                            app.link(elements,svgContainer)  
                        }
                    }catch(err){
                        console.log(err)
                    }
                })
            })
        },
        link:(elements,svgCont)=>{
            const elStart = {
                "height": elements[0].clientHeight,
                "width": elements[0].clientWidth,
                "x": (elements[0].offsetLeft) + elements[0].clientWidth/2,
                "y": (elements[0].offsetTop) + elements[0].clientHeight/2
            }
            const elEnd ={
                "height": elements[1].clientHeight,
                "width": elements[1].clientWidth,
                "x": (elements[1].offsetLeft) + elements[1].clientWidth/2,
                "y": (elements[1].offsetTop) + elements[1].clientHeight/2
            }

            const newG = document.createElementNS("http://www.w3.org/2000/svg","g")
            const newLine = document.createElementNS("http://www.w3.org/2000/svg","line")
            const newCircleStart = document.createElementNS("http://www.w3.org/2000/svg","circle")
            const newCircleEnd = document.createElementNS("http://www.w3.org/2000/svg","circle")
            const randColor = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},1)`

            newCircleStart.setAttribute("r",5)
            newCircleEnd.setAttribute("r",5)
            newCircleStart.style.fill = randColor
            newCircleEnd.style.fill = randColor

            switch(true){
                case (elStart.x == elEnd.x): 

                    console.log(elStart.y,elEnd.y)
                
                    let random = (Math.random()*(elStart.width/2))-elStart.width/4

                    newCircleStart.setAttribute("cx",elStart.x+random)
                    newCircleEnd.setAttribute("cx",elEnd.x+random)

                    newCircleStart.setAttribute("cy",elStart.y + (elStart.height/2))
                    newCircleEnd.setAttribute("cy",elEnd.y - (elEnd.height/2))

                    newLine.setAttribute("x1",elStart.x+random)
                    newLine.setAttribute("x2",elEnd.x+random)

                    newLine.setAttribute("y1",elStart.y + (elStart.height/2))
                    newLine.setAttribute("y2",elEnd.y - (elEnd.height/2))
                    newLine.setAttribute("style",`stroke:${randColor};stroke-width:2`)


                    newG.appendChild(newCircleStart)
                    newG.appendChild(newCircleEnd)
                    newG.appendChild(newLine)

                    svgCont.appendChild(newG)

                    break
                default:
                    console.log(elStart.x == elEnd.x)
                    break
            }

        }
    }
    app.init()
})()