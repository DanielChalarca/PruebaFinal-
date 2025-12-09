--
-- PostgreSQL database dump
--

\restrict 5daEpfHkO8PkR4iB00YkIy7rMrBYOAltMcVN62FfrPe8uiPhWEXxUCKmc9bYo6o

-- Dumped from database version 15.15
-- Dumped by pg_dump version 15.15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: tickets_priority_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tickets_priority_enum AS ENUM (
    'baja',
    'media',
    'alta',
    'crítica'
);


ALTER TYPE public.tickets_priority_enum OWNER TO postgres;

--
-- Name: tickets_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tickets_status_enum AS ENUM (
    'abierto',
    'en progreso',
    'resuelto',
    'cerrado'
);


ALTER TYPE public.tickets_status_enum OWNER TO postgres;

--
-- Name: users_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.users_role_enum AS ENUM (
    'admin',
    'technician',
    'client'
);


ALTER TYPE public.users_role_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    company character varying(100),
    "contactEmail" character varying(100) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" uuid
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- Name: technicians; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.technicians (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    specialty character varying(100) NOT NULL,
    availability boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" uuid
);


ALTER TABLE public.technicians OWNER TO postgres;

--
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying(200) NOT NULL,
    description text NOT NULL,
    status public.tickets_status_enum DEFAULT 'abierto'::public.tickets_status_enum NOT NULL,
    priority public.tickets_priority_enum DEFAULT 'media'::public.tickets_priority_enum NOT NULL,
    "categoryId" uuid NOT NULL,
    "clientId" uuid NOT NULL,
    "technicianId" uuid,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying NOT NULL,
    role public.users_role_enum DEFAULT 'client'::public.users_role_enum NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, description, "createdAt", "updatedAt") FROM stdin;
eeba5265-0483-4348-968d-bd49bf266d9c	Solicitud	Solicitudes generales de soporte	2025-12-09 14:08:48.664984	2025-12-09 14:08:48.664984
8f352b22-2f72-4cd8-a4f0-283cbed0a453	Incidente de Hardware	Problemas relacionados con hardware	2025-12-09 14:08:48.667067	2025-12-09 14:08:48.667067
ea1d20c6-f0a8-4874-911e-5e633b6629d2	Incidente de Software	Problemas relacionados con software	2025-12-09 14:08:48.668368	2025-12-09 14:08:48.668368
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clients (id, name, company, "contactEmail", "createdAt", "updatedAt", "userId") FROM stdin;
38143448-4f56-4956-883d-39c37aa8935f	Carlos Gómez	Tech Solutions	carlos@techsolutions.com	2025-12-09 14:08:48.670147	2025-12-09 14:08:48.670147	4a80f358-2f28-466a-a0ac-9e2deea9b2fd
a98bc15f-b936-4fd5-8079-0e06a309db3d	Laura Martínez	Digital Corp	laura@digitalcorp.com	2025-12-09 14:08:48.673739	2025-12-09 14:08:48.673739	8cdb26ea-2317-48c2-8f4c-ea546cf968cb
\.


--
-- Data for Name: technicians; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.technicians (id, name, specialty, availability, "createdAt", "updatedAt", "userId") FROM stdin;
e3163107-d816-4371-9e28-ba53b74b838a	María López	Redes y Conectividad	t	2025-12-09 14:08:48.675516	2025-12-09 14:08:48.675516	230698ae-7fad-46e2-a9b9-b5dd963696df
ceda4728-f2fe-4634-8f3b-843ca4afe108	Pedro Sánchez	Soporte de Software	t	2025-12-09 14:08:48.67721	2025-12-09 14:08:48.67721	0471c474-d2cd-4af0-88a8-6dfd425f6dd6
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tickets (id, title, description, status, priority, "categoryId", "clientId", "technicianId", "createdAt", "updatedAt") FROM stdin;
29b67ee0-8887-4d96-8f9f-e4ec0baaab3b	Problema con impresora HP	La impresora no responde al enviar documentos	en progreso	alta	8f352b22-2f72-4cd8-a4f0-283cbed0a453	a98bc15f-b936-4fd5-8079-0e06a309db3d	\N	2025-12-09 15:38:57.61487	2025-12-09 15:51:14.047361
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, role, "createdAt", "updatedAt") FROM stdin;
fb91edcc-d221-4467-8ec3-3a593ff72bff	Admin Principal	admin@techhelpdesk.com	$2b$10$rnFJrdaU5csxOhADS/GYleALDTiyM76uDAXs/kEOgTBz012ojc8Ly	admin	2025-12-09 14:08:48.652066	2025-12-09 14:08:48.652066
4a80f358-2f28-466a-a0ac-9e2deea9b2fd	Carlos Gómez	carlos@example.com	$2b$10$rnFJrdaU5csxOhADS/GYleALDTiyM76uDAXs/kEOgTBz012ojc8Ly	client	2025-12-09 14:08:48.658718	2025-12-09 14:08:48.658718
8cdb26ea-2317-48c2-8f4c-ea546cf968cb	Laura Martínez	laura@example.com	$2b$10$rnFJrdaU5csxOhADS/GYleALDTiyM76uDAXs/kEOgTBz012ojc8Ly	client	2025-12-09 14:08:48.660245	2025-12-09 14:08:48.660245
230698ae-7fad-46e2-a9b9-b5dd963696df	María López	maria@techhelpdesk.com	$2b$10$rnFJrdaU5csxOhADS/GYleALDTiyM76uDAXs/kEOgTBz012ojc8Ly	technician	2025-12-09 14:08:48.661619	2025-12-09 14:08:48.661619
0471c474-d2cd-4af0-88a8-6dfd425f6dd6	Pedro Sánchez	pedro@techhelpdesk.com	$2b$10$rnFJrdaU5csxOhADS/GYleALDTiyM76uDAXs/kEOgTBz012ojc8Ly	technician	2025-12-09 14:08:48.662774	2025-12-09 14:08:48.662774
\.


--
-- Name: categories PK_24dbc6126a28ff948da33e97d3b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY (id);


--
-- Name: tickets PK_343bc942ae261cf7a1377f48fd0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: technicians PK_b14514b23605f79475be53065b3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.technicians
    ADD CONSTRAINT "PK_b14514b23605f79475be53065b3" PRIMARY KEY (id);


--
-- Name: clients PK_f1ab7cf3a5714dbc6bb4e1c28a4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY (id);


--
-- Name: clients REL_59c1e5e51addd6ebebf76230b3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT "REL_59c1e5e51addd6ebebf76230b3" UNIQUE ("userId");


--
-- Name: technicians REL_8099b6a6478964454f22f7e0f8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.technicians
    ADD CONSTRAINT "REL_8099b6a6478964454f22f7e0f8" UNIQUE ("userId");


--
-- Name: categories UQ_8b0be371d28245da6e4f4b61878; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE (name);


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: tickets FK_18d92e4ad96cc89472968daf1e3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "FK_18d92e4ad96cc89472968daf1e3" FOREIGN KEY ("clientId") REFERENCES public.clients(id) ON DELETE CASCADE;


--
-- Name: tickets FK_47d11648238661a19175930d8f2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "FK_47d11648238661a19175930d8f2" FOREIGN KEY ("technicianId") REFERENCES public.technicians(id) ON DELETE SET NULL;


--
-- Name: clients FK_59c1e5e51addd6ebebf76230b37; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT "FK_59c1e5e51addd6ebebf76230b37" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: technicians FK_8099b6a6478964454f22f7e0f8c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.technicians
    ADD CONSTRAINT "FK_8099b6a6478964454f22f7e0f8c" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: tickets FK_f47458a36c743b14e0371b70a6e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "FK_f47458a36c743b14e0371b70a6e" FOREIGN KEY ("categoryId") REFERENCES public.categories(id) ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict 5daEpfHkO8PkR4iB00YkIy7rMrBYOAltMcVN62FfrPe8uiPhWEXxUCKmc9bYo6o

