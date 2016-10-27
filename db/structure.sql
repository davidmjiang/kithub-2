--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: add_notes_to_student_models; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE add_notes_to_student_models (
    id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: add_notes_to_student_models_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE add_notes_to_student_models_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: add_notes_to_student_models_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE add_notes_to_student_models_id_seq OWNED BY add_notes_to_student_models.id;


--
-- Name: additional_materials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE additional_materials (
    id integer NOT NULL,
    lesson_plan_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    material_file_name character varying,
    material_content_type character varying,
    material_file_size integer,
    material_updated_at timestamp without time zone
);


--
-- Name: additional_materials_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE additional_materials_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: additional_materials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE additional_materials_id_seq OWNED BY additional_materials.id;


--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: assignments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE assignments (
    id integer NOT NULL,
    title character varying DEFAULT 'Default'::character varying,
    assignment_type character varying,
    possible_score integer DEFAULT 0,
    course_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: assignments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE assignments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: assignments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE assignments_id_seq OWNED BY assignments.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE comments (
    id integer NOT NULL,
    body text,
    teacher_id integer,
    commentable_id integer,
    commentable_type character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE comments_id_seq OWNED BY comments.id;


--
-- Name: contributions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE contributions (
    id integer NOT NULL,
    type character varying,
    date date,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: contributions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE contributions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contributions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE contributions_id_seq OWNED BY contributions.id;


--
-- Name: course_days; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE course_days (
    id integer NOT NULL,
    date timestamp without time zone,
    course_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: course_days_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE course_days_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: course_days_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE course_days_id_seq OWNED BY course_days.id;


--
-- Name: courses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE courses (
    id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    title character varying,
    teacher_id integer,
    identifier character varying,
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    meeting_days character varying
);


--
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE courses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE courses_id_seq OWNED BY courses.id;


--
-- Name: flat_curves; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE flat_curves (
    id integer NOT NULL,
    flat_rate integer,
    assignment_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: flat_curves_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE flat_curves_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: flat_curves_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE flat_curves_id_seq OWNED BY flat_curves.id;


--
-- Name: lesson_plan_contributors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE lesson_plan_contributors (
    id integer NOT NULL,
    teacher_id integer,
    lesson_plan_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: lesson_plan_contributors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE lesson_plan_contributors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lesson_plan_contributors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE lesson_plan_contributors_id_seq OWNED BY lesson_plan_contributors.id;


--
-- Name: lesson_plan_days; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE lesson_plan_days (
    id integer NOT NULL,
    lesson_plan_id integer,
    course_day_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: lesson_plan_days_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE lesson_plan_days_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lesson_plan_days_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE lesson_plan_days_id_seq OWNED BY lesson_plan_days.id;


--
-- Name: lesson_plan_standards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE lesson_plan_standards (
    id integer NOT NULL,
    lesson_plan_id integer,
    standard_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: lesson_plan_standards_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE lesson_plan_standards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lesson_plan_standards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE lesson_plan_standards_id_seq OWNED BY lesson_plan_standards.id;


--
-- Name: lesson_plan_stars; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE lesson_plan_stars (
    id integer NOT NULL,
    teacher_id integer,
    lesson_plan_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: lesson_plan_stars_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE lesson_plan_stars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lesson_plan_stars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE lesson_plan_stars_id_seq OWNED BY lesson_plan_stars.id;


--
-- Name: lesson_plans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE lesson_plans (
    id integer NOT NULL,
    title character varying NOT NULL,
    content text NOT NULL,
    teacher_id integer,
    hours double precision,
    version double precision DEFAULT 1.0,
    state character varying,
    grade integer,
    subject character varying,
    lesson_type character varying,
    parent_plan_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    parent_version double precision DEFAULT 0.0
);


--
-- Name: lesson_plans_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE lesson_plans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lesson_plans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE lesson_plans_id_seq OWNED BY lesson_plans.id;


--
-- Name: linear_curves; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE linear_curves (
    id integer NOT NULL,
    "rawA" double precision,
    "rawB" double precision,
    "curvedA" double precision,
    "curvedB" double precision,
    assignment_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: linear_curves_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE linear_curves_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: linear_curves_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE linear_curves_id_seq OWNED BY linear_curves.id;


--
-- Name: pull_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE pull_requests (
    id integer NOT NULL,
    title character varying NOT NULL,
    description text,
    parent_plan_id integer,
    forked_plan_id integer,
    status character varying,
    accept_reject_time timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: pull_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE pull_requests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pull_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE pull_requests_id_seq OWNED BY pull_requests.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE schema_migrations (
    version character varying NOT NULL
);


--
-- Name: standards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE standards (
    id integer NOT NULL,
    title character varying NOT NULL,
    state character varying,
    subject character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: standards_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE standards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: standards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE standards_id_seq OWNED BY standards.id;


--
-- Name: student_courses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE student_courses (
    id integer NOT NULL,
    student_id integer,
    course_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: student_courses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE student_courses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: student_courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE student_courses_id_seq OWNED BY student_courses.id;


--
-- Name: students; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE students (
    id integer NOT NULL,
    first_name character varying,
    last_name character varying,
    email character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    notes text
);


--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE students_id_seq OWNED BY students.id;


--
-- Name: submissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE submissions (
    id integer NOT NULL,
    assignment_id integer,
    student_id integer,
    raw_score double precision,
    real_score double precision,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: submissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE submissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: submissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE submissions_id_seq OWNED BY submissions.id;


--
-- Name: taggings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE taggings (
    id integer NOT NULL,
    lesson_plan_id integer NOT NULL,
    tag_id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: taggings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE taggings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: taggings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE taggings_id_seq OWNED BY taggings.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tags (
    id integer NOT NULL,
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE tags_id_seq OWNED BY tags.id;


--
-- Name: teacher_followings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE teacher_followings (
    id integer NOT NULL,
    followed_id integer,
    follower_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: teacher_followings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE teacher_followings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: teacher_followings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE teacher_followings_id_seq OWNED BY teacher_followings.id;


--
-- Name: teachers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE teachers (
    id integer NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    encrypted_password character varying DEFAULT ''::character varying NOT NULL,
    first_name character varying,
    last_name character varying,
    state character varying,
    reset_password_token character varying,
    reset_password_sent_at timestamp without time zone,
    remember_created_at timestamp without time zone,
    sign_in_count integer DEFAULT 0 NOT NULL,
    current_sign_in_at timestamp without time zone,
    last_sign_in_at timestamp without time zone,
    current_sign_in_ip inet,
    last_sign_in_ip inet,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    avatar_file_name character varying,
    avatar_content_type character varying,
    avatar_file_size integer,
    avatar_updated_at timestamp without time zone,
    provider character varying,
    uid character varying
);


--
-- Name: teachers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE teachers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: teachers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE teachers_id_seq OWNED BY teachers.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE users (
    id integer NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    encrypted_password character varying DEFAULT ''::character varying NOT NULL,
    reset_password_token character varying,
    reset_password_sent_at timestamp without time zone,
    remember_created_at timestamp without time zone,
    sign_in_count integer DEFAULT 0 NOT NULL,
    current_sign_in_at timestamp without time zone,
    last_sign_in_at timestamp without time zone,
    current_sign_in_ip inet,
    last_sign_in_ip inet,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    meta_id integer,
    meta_type character varying
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY add_notes_to_student_models ALTER COLUMN id SET DEFAULT nextval('add_notes_to_student_models_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY additional_materials ALTER COLUMN id SET DEFAULT nextval('additional_materials_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY assignments ALTER COLUMN id SET DEFAULT nextval('assignments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY comments ALTER COLUMN id SET DEFAULT nextval('comments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY contributions ALTER COLUMN id SET DEFAULT nextval('contributions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY course_days ALTER COLUMN id SET DEFAULT nextval('course_days_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY courses ALTER COLUMN id SET DEFAULT nextval('courses_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY flat_curves ALTER COLUMN id SET DEFAULT nextval('flat_curves_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY lesson_plan_contributors ALTER COLUMN id SET DEFAULT nextval('lesson_plan_contributors_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY lesson_plan_days ALTER COLUMN id SET DEFAULT nextval('lesson_plan_days_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY lesson_plan_standards ALTER COLUMN id SET DEFAULT nextval('lesson_plan_standards_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY lesson_plan_stars ALTER COLUMN id SET DEFAULT nextval('lesson_plan_stars_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY lesson_plans ALTER COLUMN id SET DEFAULT nextval('lesson_plans_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY linear_curves ALTER COLUMN id SET DEFAULT nextval('linear_curves_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY pull_requests ALTER COLUMN id SET DEFAULT nextval('pull_requests_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY standards ALTER COLUMN id SET DEFAULT nextval('standards_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY student_courses ALTER COLUMN id SET DEFAULT nextval('student_courses_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY students ALTER COLUMN id SET DEFAULT nextval('students_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY submissions ALTER COLUMN id SET DEFAULT nextval('submissions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY taggings ALTER COLUMN id SET DEFAULT nextval('taggings_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY tags ALTER COLUMN id SET DEFAULT nextval('tags_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY teacher_followings ALTER COLUMN id SET DEFAULT nextval('teacher_followings_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY teachers ALTER COLUMN id SET DEFAULT nextval('teachers_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: add_notes_to_student_models_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY add_notes_to_student_models
    ADD CONSTRAINT add_notes_to_student_models_pkey PRIMARY KEY (id);


--
-- Name: additional_materials_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY additional_materials
    ADD CONSTRAINT additional_materials_pkey PRIMARY KEY (id);


--
-- Name: ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY assignments
    ADD CONSTRAINT assignments_pkey PRIMARY KEY (id);


--
-- Name: comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: contributions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY contributions
    ADD CONSTRAINT contributions_pkey PRIMARY KEY (id);


--
-- Name: course_days_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY course_days
    ADD CONSTRAINT course_days_pkey PRIMARY KEY (id);


--
-- Name: courses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: flat_curves_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY flat_curves
    ADD CONSTRAINT flat_curves_pkey PRIMARY KEY (id);


--
-- Name: lesson_plan_contributors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lesson_plan_contributors
    ADD CONSTRAINT lesson_plan_contributors_pkey PRIMARY KEY (id);


--
-- Name: lesson_plan_days_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lesson_plan_days
    ADD CONSTRAINT lesson_plan_days_pkey PRIMARY KEY (id);


--
-- Name: lesson_plan_standards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lesson_plan_standards
    ADD CONSTRAINT lesson_plan_standards_pkey PRIMARY KEY (id);


--
-- Name: lesson_plan_stars_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lesson_plan_stars
    ADD CONSTRAINT lesson_plan_stars_pkey PRIMARY KEY (id);


--
-- Name: lesson_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lesson_plans
    ADD CONSTRAINT lesson_plans_pkey PRIMARY KEY (id);


--
-- Name: linear_curves_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY linear_curves
    ADD CONSTRAINT linear_curves_pkey PRIMARY KEY (id);


--
-- Name: pull_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pull_requests
    ADD CONSTRAINT pull_requests_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: standards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY standards
    ADD CONSTRAINT standards_pkey PRIMARY KEY (id);


--
-- Name: student_courses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY student_courses
    ADD CONSTRAINT student_courses_pkey PRIMARY KEY (id);


--
-- Name: students_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY submissions
    ADD CONSTRAINT submissions_pkey PRIMARY KEY (id);


--
-- Name: taggings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY taggings
    ADD CONSTRAINT taggings_pkey PRIMARY KEY (id);


--
-- Name: tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: teacher_followings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY teacher_followings
    ADD CONSTRAINT teacher_followings_pkey PRIMARY KEY (id);


--
-- Name: teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: index_comments_on_commentable_type_and_commentable_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_comments_on_commentable_type_and_commentable_id ON comments USING btree (commentable_type, commentable_id);


--
-- Name: index_comments_on_teacher_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_comments_on_teacher_id ON comments USING btree (teacher_id);


--
-- Name: index_course_days_on_course_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_course_days_on_course_id ON course_days USING btree (course_id);


--
-- Name: index_lesson_plan_contributors_on_lesson_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_plan_contributors_on_lesson_plan_id ON lesson_plan_contributors USING btree (lesson_plan_id);


--
-- Name: index_lesson_plan_contributors_on_teacher_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_plan_contributors_on_teacher_id ON lesson_plan_contributors USING btree (teacher_id);


--
-- Name: index_lesson_plan_contributors_on_teacher_id_and_lesson_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_lesson_plan_contributors_on_teacher_id_and_lesson_plan_id ON lesson_plan_contributors USING btree (teacher_id, lesson_plan_id);


--
-- Name: index_lesson_plan_days_on_course_day_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_plan_days_on_course_day_id ON lesson_plan_days USING btree (course_day_id);


--
-- Name: index_lesson_plan_days_on_lesson_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_plan_days_on_lesson_plan_id ON lesson_plan_days USING btree (lesson_plan_id);


--
-- Name: index_lesson_plan_standards_on_lesson_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_plan_standards_on_lesson_plan_id ON lesson_plan_standards USING btree (lesson_plan_id);


--
-- Name: index_lesson_plan_standards_on_lesson_plan_id_and_standard_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_lesson_plan_standards_on_lesson_plan_id_and_standard_id ON lesson_plan_standards USING btree (lesson_plan_id, standard_id);


--
-- Name: index_lesson_plan_standards_on_standard_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_plan_standards_on_standard_id ON lesson_plan_standards USING btree (standard_id);


--
-- Name: index_lesson_plan_stars_on_lesson_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_plan_stars_on_lesson_plan_id ON lesson_plan_stars USING btree (lesson_plan_id);


--
-- Name: index_lesson_plan_stars_on_teacher_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_plan_stars_on_teacher_id ON lesson_plan_stars USING btree (teacher_id);


--
-- Name: index_lesson_plan_stars_on_teacher_id_and_lesson_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_lesson_plan_stars_on_teacher_id_and_lesson_plan_id ON lesson_plan_stars USING btree (teacher_id, lesson_plan_id);


--
-- Name: index_lesson_plans_on_parent_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_plans_on_parent_plan_id ON lesson_plans USING btree (parent_plan_id);


--
-- Name: index_lesson_plans_on_teacher_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_plans_on_teacher_id ON lesson_plans USING btree (teacher_id);


--
-- Name: index_linear_curves_on_assignment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_linear_curves_on_assignment_id ON linear_curves USING btree (assignment_id);


--
-- Name: index_pull_requests_on_forked_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_pull_requests_on_forked_plan_id ON pull_requests USING btree (forked_plan_id);


--
-- Name: index_pull_requests_on_parent_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_pull_requests_on_parent_plan_id ON pull_requests USING btree (parent_plan_id);


--
-- Name: index_pull_requests_on_parent_plan_id_and_forked_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_pull_requests_on_parent_plan_id_and_forked_plan_id ON pull_requests USING btree (parent_plan_id, forked_plan_id);


--
-- Name: index_student_courses_on_course_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_student_courses_on_course_id ON student_courses USING btree (course_id);


--
-- Name: index_student_courses_on_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_student_courses_on_student_id ON student_courses USING btree (student_id);


--
-- Name: index_submissions_on_assignment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_submissions_on_assignment_id ON submissions USING btree (assignment_id);


--
-- Name: index_submissions_on_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_submissions_on_student_id ON submissions USING btree (student_id);


--
-- Name: index_taggings_on_lesson_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_taggings_on_lesson_plan_id ON taggings USING btree (lesson_plan_id);


--
-- Name: index_taggings_on_lesson_plan_id_and_tag_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_taggings_on_lesson_plan_id_and_tag_id ON taggings USING btree (lesson_plan_id, tag_id);


--
-- Name: index_taggings_on_tag_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_taggings_on_tag_id ON taggings USING btree (tag_id);


--
-- Name: index_teacher_followings_on_followed_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_teacher_followings_on_followed_id ON teacher_followings USING btree (followed_id);


--
-- Name: index_teacher_followings_on_followed_id_and_follower_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_teacher_followings_on_followed_id_and_follower_id ON teacher_followings USING btree (followed_id, follower_id);


--
-- Name: index_teacher_followings_on_follower_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_teacher_followings_on_follower_id ON teacher_followings USING btree (follower_id);


--
-- Name: index_teachers_on_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_teachers_on_email ON teachers USING btree (email);


--
-- Name: index_teachers_on_reset_password_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_teachers_on_reset_password_token ON teachers USING btree (reset_password_token);


--
-- Name: index_users_on_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_email ON users USING btree (email);


--
-- Name: index_users_on_meta_id_and_meta_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_users_on_meta_id_and_meta_type ON users USING btree (meta_id, meta_type);


--
-- Name: index_users_on_reset_password_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_reset_password_token ON users USING btree (reset_password_token);


--
-- Name: lesson_plans_to_tsvector_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lesson_plans_to_tsvector_idx ON lesson_plans USING gin (to_tsvector('english'::regconfig, (title)::text));


--
-- Name: lesson_plans_to_tsvector_idx1; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lesson_plans_to_tsvector_idx1 ON lesson_plans USING gin (to_tsvector('english'::regconfig, content));


--
-- Name: teachers_to_tsvector_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX teachers_to_tsvector_idx ON teachers USING gin (to_tsvector('english'::regconfig, (first_name)::text));


--
-- Name: teachers_to_tsvector_idx1; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX teachers_to_tsvector_idx1 ON teachers USING gin (to_tsvector('english'::regconfig, (last_name)::text));


--
-- Name: teachers_to_tsvector_idx2; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX teachers_to_tsvector_idx2 ON teachers USING gin (to_tsvector('english'::regconfig, (email)::text));


--
-- PostgreSQL database dump complete
--

SET search_path TO "$user", public;

INSERT INTO schema_migrations (version) VALUES ('20161014132221'), ('20161014132811'), ('20161014133102'), ('20161014140357'), ('20161014141614'), ('20161014141647'), ('20161014142046'), ('20161014142139'), ('20161014143029'), ('20161014144025'), ('20161014145229'), ('20161014150854'), ('20161014153722'), ('20161014154048'), ('20161014154425'), ('20161014154536'), ('20161014154647'), ('20161014164623'), ('20161018160504'), ('20161018211932'), ('20161018213940'), ('20161018214907'), ('20161018225025'), ('20161019155147'), ('20161019204921'), ('20161019210654'), ('20161024160525'), ('20161024174203'), ('20161024183757'), ('20161024213845'), ('20161024220555'), ('20161024220706'), ('20161025155337'), ('20161025163826'), ('20161025181659'), ('20161025182121'), ('20161025184208'), ('20161025184358'), ('20161025212945'), ('20161025223101');


