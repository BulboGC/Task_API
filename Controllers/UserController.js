const {createUser,uniqueEmail,deleteUser, updateUser,listUser} = require('../Services/UserService')
const {authenticateUser} = require('../Services/authService');


require('dotenv').config();


const getUser = async (req,res) => {
  const userId = req.user.id; 

  try{
    const user = await listUser(userId);
    res.status(200).json(user);
  }catch(err){
    res.status(400).send({message:err.message});
  }
}

const editUser = async (req,res)=>{
  const userId = req.user.id; 
  const {name,email,password} = req.body

  const wheredata = {
    ...(name !== undefined && { name }),
    ...(email !== undefined && { email }),
    ...(password !== undefined && {password})
  };


  try {
    await updateUser(userId, wheredata);
    res.status(201).send({ message: 'Dados atualizados com sucesso' });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }


}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
      const token = await authenticateUser(email, password);

      res.status(200).json({ status: 200, message: 'Sucesso', token });
  } catch (err) {
      res.status(401).json({ status: 401, message: err.message });
  }
};

const addUser = async (req, res) => {
  const {  name,password, email } = req.body;

  if ( !password || !email) {
    return res
        .status(400)
        .send({message:'Informe todos os campos, por favor'});
  }

  const match = await uniqueEmail(email);
  
  if(match == true){
    return res
      .status(400)
      .send({message:'O Email informado ja está cadastrado no sistema'});
  }



  try {
      const savedUser = await createUser( name,password, email);
      return res.status(201).json(savedUser);

  } catch (err) {

      return res.status(500).send({message: err.message});
  }
};

const dellUser = async(req,res)=>{
  const userId = req.user.id; 
  
  try{
    await deleteUser(userId)
    res.status(200).send({message:'transação realizada com sucesso'});

  }catch(err)
  {
    res.status(400).send({message:err.message});
  }
  

}


  

  module.exports = { addUser,login,dellUser,editUser,getUser}; // Exportar os Metodos de controle