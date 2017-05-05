-- 触发器示例

--------------------------------------------------------------------
-- 演示当一个表有update时，自动往另一表插入一条日志信息
drop trigger if exists upd_state;
delimiter $$
-- after/before insert/update/delete 组合，一个表总共有6种情况
create trigger upd_state after update on mail
for each row -- 这是固定语句
begin
	if new.approve_state != old.approve_state and new.approve_state in ('已启用', '已停用')
	then
		insert into state_log values (new.mail_id, now(), new.approve_state);
	end if;
end
$$

delimiter ;

--------------- 演示实现字段default为uuid -----------------------------
DELIMITER ;;
CREATE TRIGGER before_insert_tablename
BEFORE INSERT ON tablename -- 对replace也适用，因为replace相当于先delete，再insert。而非update
FOR EACH ROW
BEGIN
  IF new.uuid IS NULL THEN
    SET new.uuid = uuid();
  END IF;
END
;;

DELIMITER ;
