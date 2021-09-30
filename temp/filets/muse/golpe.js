const d = 39
const txt = `
!golpe!

16 16 0
moveto 8 ${0-d}
curveto 3 ${0-d} 0 ${3-d} 0 ${8-d}
moveto 0 ${8-d}
curveto 0 ${13-d} 3 ${16-d} 8 ${16-d}
moveto 8 ${16-d}
curveto 13 ${16-d} 16 ${13-d} 16 ${8-d}
moveto 16 ${8-d}
curveto 16 ${3-d} 13 ${0-d} 8 ${0-d}
END
`
console.log(txt)
