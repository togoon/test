export const mysql = {
  in : [
    {
      name : 'volumn',
      type : 'storage',
    },
    {
      name : 'passwd',
      type : 'string',
    }
  ],
  out : 'mysql',
}

export const storage = {
  out : 'storage',  
}

export default { mysql, storage }


