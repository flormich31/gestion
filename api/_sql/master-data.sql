INSERT INTO `user_roles` (`guid`, `role`, `description`) VALUES ('1', 'student', 'Alumno');
INSERT INTO `user_roles` (`guid`, `role`, `description`) VALUES ('2', 'teacher', 'Profesor');

INSERT INTO `users` (`is_active`, `role_guid`, `name`, `lastname`, `created_at`) VALUES ('1', '1', 'Florencia', 'Micheloud', '2022-10-15');

INSERT INTO `groups` (`author_id`, `name`, `code`) VALUES ('1', 'Grupo 4to A', '123');
INSERT INTO `groups` (`author_id`, `name`, `code`) VALUES ('1', 'Grupo 4to B', '456');
