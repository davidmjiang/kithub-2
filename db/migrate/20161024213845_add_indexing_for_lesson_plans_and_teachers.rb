class AddIndexingForLessonPlansAndTeachers < ActiveRecord::Migration[5.0]
  def change
    execute "
    create index on teachers using gin(to_tsvector('english', first_name));
    create index on teachers using gin(to_tsvector('english', last_name));
    create index on teachers using gin(to_tsvector('english', email));
    create index on lesson_plans using gin(to_tsvector('english', title));
    create index on lesson_plans using gin(to_tsvector('english', content)); "
  end
end
