const projects =require('../models/projectModel')

//add project
exports.addProjectController = async(req,res)=>{
    console.log("Inside addProjectController");
    const {title,language,overview,github,website} =req.body
    console.log(title,language,overview,github,website);
    console.log(req.file.filename);

    try {
        
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project already exists...please add another")
        }
        else{
            const newProject = new projects({
                title,language,overview,github,website,projectImg:req.file.filename,userId:req.userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (error) {
        res.status(401).json(err)
    }
}


    //get 3 projects to show in Home no auth required
 exports.getAllProjectsForHomeController =async(req,res)=>{
        console.log("inside home projectt controller");
        try {
            const allProjects=await projects.find().limit(3)
            res.status(200).json(allProjects)
        } catch (err) {
            res.status(401).json(err)
        }
        
    }

 //get all projects     auth required

 exports.getAllProjectController =async(req,res)=>{
    console.log(("Inside all projects "));
    //get query parayameter for url of search
    const searchKey =req.query.search
    const query = {
        
            language:{
                $regex:searchKey,$options:"i"
            }
        
    }
    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    } catch (err) {
        res.status(401).json(err)
    }
    

 }

 //get user project -authentication reuired

 exports.getUserProjectsController = async(req,res)=>{
    console.log("Inside getUserProject");
    const userId = req.userId
    try {

        const allUserProjects = await projects.find({userId})
        res.status(200).json(allUserProjects)
        
    } catch (err) {
        res.status(401).json(err)
        
    }
    
 }

 //remove project
 exports.removeProjectController =async(req,res)=>{
    console.log("Inside removeProjectController0");
    const {pId} = req.params
    try {
        
        const removeProject = await projects.findByIdAndDelete({_id:pId})
        res.status(200).json(removeProject)
    } catch (err) {
        res.status(401).json(err)
        
        
    }
    
 }

 //edit project auth required
 exports.editProjectController =async(req,res)=>{
    console.log("Inside editproject controller");
    const {pId} =req.params
    const {title,language,overview,github,website,projectImg} =req.body
    const uploadImg=req.file?req.file.filename:projectImg
    const userId = req.userId
    try {
        const updateProject = await projects.findByIdAndUpdate({_id:pId},{title,language,overview,github,website,projectImg:uploadImg},{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    } catch (err) {
        res.status(401).json(err)
        
    }
    
 }





    
    


    
    
