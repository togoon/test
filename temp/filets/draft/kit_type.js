export const mysql = {
  in : {
    volumn : 'storage',
    passwd : 'string',
  },
  out : 'mysql',
}

export const storage = {
  out : 'storage',  
}

export const bp_A = {
  in : {
    x1 : 'string',
  },
  out : {
    o1 : 'string', 
    o2 : 'string',
  },
}

export const bp_B = {
  in : {
    x1 : 'string',
    x2 : 'string',
  },
  out : {
    o1 : 'string', 
    o2 : 'string',
  },
}

export const bp_C = {
  in : {
    x1 : 'string',
    x2 : 'string',
  },
  out : {
    o1 : 'string', 
  },
}

export const My = {
  in : {
    x1 : 'string',
    x2 : 'string',
  },
  out : {
    o1 : 'string', 
  },
}

export default { mysql, storage, bp_A, bp_B, bp_C, My }


