const ruta=require("express").Router();
const UsuarioClase=require("../clases/UsuarioClase");
const UsuarioBD=require("../bd/UsuariosBD");

ruta.get("/",async (req,res)=>{
     //var usuario1=new UsuarioClase();
     const usuariobd=new UsuarioBD();
     const usuariosMySql=await usuariobd.mostrarUsuarios();
     var usuariosCorrectos = [];
     usuariosMySql.forEach(usuario => {
        var usuario1 = new UsuarioClase(usuario);

        if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
            usuariosCorrectos.push(usuario);
        }
    });

     //console.log(usuariosCorrectos);
     res.render("mostrarUsuarios", {usuariosCorrectos});
});

ruta.post("/agregarUsuario",(req,res)=>{
    var usuario1=new UsuarioClase(req.body);
    console.log(usuario1.mostrarDatos);
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        const usuariobd = new UsuarioBD();
       usuariobd.nuevoUsuario(usuario1.mostrarDatos);
        //console.log(usuario1.mostrarDatos);
        //res.render("inicio",usuario1.mostrarDatos);
        res.redirect("/")
    }else{
        res.render("error");
    }
    
});

ruta.get("/agregarUsuario",(req,res)=>{
    res.render("formulario");
});

ruta.get("/editarUsuario/:idUsuario",async(req,res)=>{
    try {
        const usuariobd=new UsuarioBD();
        const usuaio=await usuariobd.usuarioId(req.params.idUsuario);
        console.log(usuaio);
        res.render("editarUsuario", usuaio);

    } catch (error) {
        
    }
    //res.end();
});
ruta.post("/editarUsuario", async(req,res)=>{
   try {
    const usuariobd= new UsuarioBD();
    await usuariobd.editarUsuario(req.body);
    console.log("Usuario editado correctamente");
    res.redirect("/");
   } catch (error) {
    console.error("Error al editar el usuario");
   } 
});

ruta.get("/borrarUsuario/:id",async(req,res)=>{
try {
    const usuariobd= new UsuarioBD();
    await usuariobd.borrarUsuario(req.params.id);
    res.redirect("/");
} catch (error) {
    
}
});


module.exports=ruta;