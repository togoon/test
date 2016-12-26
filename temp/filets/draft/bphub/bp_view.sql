-- =================================================================================
-- =================================== blueprint ====================================
-- =================================================================================
use blueprint;

-- 蓝图
drop view if exists v_bp4biz;
create view v_bp4biz as
select id c_id, name c_name, user, topo, yaml
, case when ( topo = '' or topo is null ) then 0 else 1 end level
from blueprint
;

