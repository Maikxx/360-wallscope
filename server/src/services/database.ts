require('dotenv').config()
import { Client } from 'pg'
import format from 'pg-format'

const DATABASE_CONNECTION_OPTIONS = process.env.NODE_ENV === 'production'
    ? {
        ssl: true,
        connectionString: process.env.DATABASE_URL,
    }
    : {
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        port: Number(process.env.PG_PORT),
        password: process.env.PG_PASSWORD,
    }

export const database = new Client(DATABASE_CONNECTION_OPTIONS)

export async function setupDatabase() {
    try {
        await database.connect()
    } catch (error) {
        console.error('Connecting to database failed')
        console.error(error.message)
        throw new Error(error.message)
    }

    try {
        await database.query(
            `
            CREATE TABLE IF NOT EXISTS users
            (
                _id SERIAL PRIMARY KEY,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            ALTER TABLE users ADD COLUMN IF NOT EXISTS full_name TEXT;

            CREATE TABLE IF NOT EXISTS boards
            (
                _id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                collaborators INTEGER[],
                owner INTEGER REFERENCES users (_id),
                results INTEGER[],
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            ALTER TABLE boards ADD COLUMN IF NOT EXISTS is_default_board BOOLEAN DEFAULT false;
            ALTER TABLE boards ADD COLUMN IF NOT EXISTS icon_name TEXT;

            DO $$ BEGIN
                CREATE TYPE link_type AS ENUM ('no_link', 'definate', 'possible');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;

            CREATE TABLE IF NOT EXISTS board_results
            (
                _id SERIAL PRIMARY KEY,
                result INTEGER REFERENCES results._id NOT NULL,
                links INTEGER[]
            );

            ALTER TABLE board_results DROP COLUMN IF EXISTS result_id;
            DROP TABLE IF EXISTS results;

            CREATE TABLE IF NOT EXISTS results
            (
                _id SERIAL PRIMARY KEY,
                title TEXT,
                data_url TEXT,
                summary TEXT,
                content TEXT,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            ALTER TABLE board_results ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

            CREATE TABLE IF NOT EXISTS links
            (
                _id SERIAL PRIMARY KEY,
                type link_type NOT NULL,
                destination_board_result_id INTEGER REFERENCES board_results (_id),
                origin_board_result_id INTEGER REFERENCES board_results (_id)
            );

            ALTER TABLE links ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
            `
        )

        await seedDatabase()
    } catch (error) {
        console.error('Creating tables failed')
        console.error(error.message)
        throw new Error(error.message)
    }
}

export async function seedDatabase() {
    try {
        const data = [
            [
                'The best time to go to the ER, according to 17,428 healthcare professionals',
                'Patients receive the best care in the emergency room between 6 a.m. and noon, according to an exclusive poll of healthcare professionals around the world. The survey was conducted between Oct. 19 and Oct. 21 on Figure 1, a case-sharing platform used by more than 500,000 physicians, nurses, paramedics, and medical students in 173 countries.',
                `<p><p>Patients receive the best care in the emergency room between 6 a.m. and noon, according to an exclusive poll of healthcare professionals around the world. The survey was conducted between Oct. 19 and Oct. 21 on Figure&nbsp;1, a case-sharing platform used by more than 500,000 physicians, nurses, paramedics, and medical students in 173 countries.</p>

                <p><img src=https://figure1.com/uploads/ercare-1.jpg" alt="ercare-1"/></p>

                <p>The Figure&nbsp;1 community was asked when, in their opinion, patients receive the best care in the emergency room. They had four multiple-choice options — between midnight and 6 a.m., 6 a.m. to noon, noon to 6 p.m. and 6 p.m. to midnight — and were invited to explain their answers in the comments. <strong>We received 17,428 responses and 399 comments in the 48-hour survey period</strong>. Figure&nbsp;1 users in 115 countries took part, with the majority coming from the United States, Great Britain, Canada, Australia, the Netherlands and Brazil.</p>

                <p>It was clear that emergency room wait times are a hot-button issue the world over. There’s the obvious concern: Can you get urgent care when you need it? And then there’s the fact that the ER is literally and figuratively the pain point of the healthcare system. If the primary care network is functioning — public health awareness, family physicians, telehealth lines, and walk-in clinics — the ER can focus on emergencies. But when the system fails, the problems appear first in the emergency room.</p>

                <p>All of which is of little concern when you’re in excruciating pain and just want the best care as soon as possible. What do you need to know at that moment? <strong>Here are nine</strong><strong> key findings from our survey:</strong></p>

                <h2 id="1-more-healthcare-professionals-recommended-the-mid-morning-than-any-other-time">1. More healthcare professionals recommended the mid-morning than any other time.</h2>

                <p>The 6 a.m. to noon timeslot was chosen by 44% of respondents. There were two main explanations offered. First, the hospital staff is functioning at peak efficiency in the early morning. &ldquo;Coffee is fresh and all hospital functions are open,&rdquo; wrote one family physician. (&ldquo;Fresh coffee is the key to an efficient emergency department,&rdquo; agreed a technologist, and a registered nurse noted that the &ldquo;best thing our managers ever invested in was a Keurig for us.&rdquo;)</p>

                <p>As one psychiatrist pointed out, there’s a particular sort of extra planning that goes into morning care:</p>

                <blockquote>
                <p>I find the night staff go over their plans before handing over to morning staff, not wanting to look silly, etc. Then the morning staff, usually fresh, assume the night staff were tired and go over the plan again, just to be sure. <em>— Psychiatrist</em></p>
                </blockquote>

                <p>The other reason cited was the caseload. By mid-morning, medical clinics and doctor’s offices are generally open, relieving some of the strain.</p>

                <blockquote>
                <p>In my workplace in the Philippines, 6 a.m. to noon [is when] most of the doctors are present. Attending physicians and consultants are available. Patients during this time have the best management. _— Registered Nurse_ </p>

                <p>Our ED picks up around 10 a.m. and lulls around 1 a.m., but not all services are open. Services start rounding at 7 a.m., so your best care would be when the ED is not busy, but is fully staffed — 6-10 a.m., really. <em>— Registered Nurse</em></p>

                <p>Between the hours of 6 and noon you have fresh practitioners and usually a higher level of administration present in the building, which helps with patient flow on a lot of levels. <em>— Registered Nurse</em></p>

                <p>The best time to go to our ER (the biggest in Holland) would be between 8 and 10 a.m. It&rsquo;s mostly the quietest time and the staff has just started their work hours. I would rate 5 to 7 a.m. as the most dangerous, as the most serious cases (cardiac asthma, myocardial infarction, traffic trauma) tend to present themselves in those hours and everyone is tired. <em>—  Anesthesiologist</em></p>
                </blockquote>

                <p><img src=https://figure1.com/uploads/ercare-3.jpg" alt="ercare-3"/></p>

                <h2 id="2-emergency-room-professionals-had-a-similar-preference">2. Emergency room professionals had a similar preference.</h2>

                <p>Healthcare professionals who identified their specialties as emergency medicine or paramedic were in close agreement with the findings of the survey. Of the 1,425 ER specialists who responded, 658 (46%) recommended the 6 a.m. to noon slot with a 2.6% margin of error at 95% confidence.</p>

                <blockquote>
                <p>As a nurse in an urban ER, I know that quality care for the stable patient is impacted by numbers. From 6am-12 patient load is the smallest, everything happens faster. Hard to deliver the best care with 45 in the waiting room &amp; no beds. — <em>Registered Nurse</em></p>
                </blockquote>

                <p><img src=https://figure1.com/uploads/ercare-21.jpg" alt="ercare-2"/></p>

                <h2 id="3-the-early-mornings-are-a-distant-second">3. The early mornings are a distant second.</h2>

                <p>Though availability of specialized treatment may vary between midnight and 6 a.m., in some cases healthcare professionals said the reduced caseload made for better care at this time.</p>

                <blockquote>
                <p>Our ER is usually least busy from 12-6 a.m., and it shows. Patients get much more thorough care and the staff actually know what&rsquo;s going on. During the day, when the ED (emergency department) census is pages long, they seem to get very little done for each patient and can&rsquo;t chart or tell us much of anything. — _Registered Nurse_ </p>

                <p>I&rsquo;ve worked all shifts in a level 1 trauma center ER. After midnight you&rsquo;ll often be seen faster and only if you need MRI or nuclear medicine will there be a delay. <em>— Technician</em></p>
                </blockquote>

                <h2 id="4-evenings-are-to-be-avoided">4. Evenings are to be avoided.</h2>

                <p>Only 15% of respondents chose the 6 p.m. to midnight slot (0.5% margin of error at 95% confidence). The explanation was consistent with the preference for morning care: All the departments that were up-and-running during the workday are now at reduced capacity, while the number of incoming patients is likely peaking.</p>

                <blockquote>
                <p>[T]he day steadily builds with the peak times around 7-9 at night as all primary care and urgent care centers are closed, so the evening is the worst time to come due to wait times only.  — <em>Nurse Practitioner</em></p>
                </blockquote>

                <h2 id="5-though-all-countries-recommended-the-mid-morning-there-were-regional-variations">5. Though all countries recommended the mid-morning, there were regional variations.</h2>

                <p><img src=https://figure1.com/uploads/ercare-4.jpg" alt="ercare-4"/></p>

                <p>63% of Swedish respondents chose the 6 a.m. to noon slot, the highest preference of any country (10.7% margin of error at 95% confidence). In Pakistan, there was no statistical difference between preferences for 6 a.m. to midnight — but a strong vote for midnight to 6 a.m. as the worst time to visit the ER. Only 11% of Pakistani users chose this time, with a 5.8% margin of error at 95% confidence.</p>

                <p><img src=https://figure1.com/uploads/ercare-5.jpg" alt="ercare-5"/></p>

                <h2 id="6-even-suggesting-care-would-ever-be-sub-optimal-was-controversial">6. Even suggesting care would ever be sub-optimal was controversial.</h2>

                <blockquote>
                <p>All the time. Emergency is emergency. _&ndash; Cardiologist_ </p>

                <p>All times the best care is given. Time problems are a result of people coming to the ER for less serious issues. — <em>Registered Nurse</em></p>

                <p>I&rsquo;m with all the 6 a.m.-12 p.m. folks. It&rsquo;s nice to say that patients get the best care &ldquo;24-7&rdquo;, but denying the human limitations of clinicians doesn&rsquo;t get us anywhere. Unfortunately, when the ER is busy, your care isn&rsquo;t as likely to be thoughtful and thorough — not malice on anybody&rsquo;s part, but because one only has so much attention and resources to give. _— Paramedic_ </p>
                </blockquote>

                <h2 id="7-the-complexity-of-the-question-raises-some-of-the-biggest-issues-in-modern-healthcare">7. The complexity of the question raises some of the biggest issues in modern healthcare.</h2>

                <blockquote>
                <p>I think the last numbers I read showed that somewhere around 70% of ED visits were for non-emergent conditions. Plus, ED visits are crazy high. I worry about enslaving the uninsured population with an ER bill that they will most likely never pay off! And, hospitals report the bad debt to the credit reporting agencies. The ramifications of empirically treating everything is much larger. <em>&ndash; Nurse Practitioner</em></p>

                <p>I personally don&rsquo;t think there is an ideal time to go to the ER. It is not used for &ldquo;true emergencies&rdquo; anymore. It&rsquo;s your PCP (primary care provider), your therapist, your only hot meal, your dialysis clinic, your child&rsquo;s pediatrician, etc. The face of the ER has drastically changed. — <em>Registered Nurse</em></p>

                <p>The state of our health care is sad. We need to act. Resources are misappropriated. We just need to rethink the way we deliver care. — Medical Student<em> </em></p>
                </blockquote>

                <h2 id="8-these-findings-are-generally-consistent-with-formal-studies-on-er-care">8. These findings are generally consistent with formal studies on ER care.</h2>

                <p>Most studies examining emergency room wait times define a successful visit as one during which you don’t die. Which is certainly true, but perhaps lacking in detail. These studies have repeatedly found no correlation between mortality and time of admittance — which confirms the respondents who said the best care is always given. Of course, there are many factors that are not life-or-death but still worth knowing. </p>

                <p>For instance, a <a href="http://www.ncbi.nlm.nih.gov/pubmed/18427127" target="_blank">2008 analysis of 62,814 patients who presented with acute myocardial infarction</a> (heart attacks) in the U.S. found no significant difference in mortality associated with when they arrived in the ER. However, wait times for those patients were 25 minutes longer if they arrived during the night (7 p.m. to 7 a.m.).</p>

                <h2 id="9-it-never-hurts-to-be-polite">9. It never hurts to be polite.</h2>

                <blockquote>
                <p>People receive the best ER care when they are willing to take part in their treatment and work with the health care professionals.  — <em>Registered Nurse</em></p>

                <p>I should hope that no matter what the situation is they will always get the best care but you will be treated better if you are polite and patient and understand triage. I always hope a patient understands that if you have been in the ER waiting for 4 hours with a sprained finger or a bloody nose and someone comes in having a MI (myocardial infarction, or heart attack) .. they are obviously going to be seen first. — <em>Nursing student</em></p>
                </blockquote></p>`,
            ],
            [
                'When to go to A&E',
                'A&E departments offer access 24 hours a day, 365 days a year. A&E staff include paramedics, A&E nurses, diagnostic radiographers, A&E reception staff, porters, healthcare assistants and emergency medicine doctors. Medical staff are highly trained in all aspects of emergency medicine.',
                `
                    <p>
                    <p>An A&amp;E department (also known as emergency department or casualty) deals with genuine life-threatening emergencies, such as:</p>

                    <ul>
                    <li><a href="https://www.nhs.uk/conditions/disorders-of-consciousness/causes/">loss of consciousness</a></li>
                    <li>acute confused state and fits that are not stopping</li>
                    <li><a href="https://www.nhs.uk/conditions/chest-pain/">chest pain</a></li>
                    <li>breathing difficulties</li>
                    <li><a href="https://www.nhs.uk/conditions/first-aid/">severe bleeding that cannot be stopped</a></li>
                    <li>severe <a href="https://www.nhs.uk/conditions/anaphylaxis/">allergic reactions</a></li>
                    <li>severe burns or scalds</li>
                    <li><a href="https://www.nhs.uk/conditions/stroke/">stroke</a></li>
                    <li>major trauma such as a road traffic accident</li>
                    </ul>

                    <p>Less severe injuries can be treated in <a href="https://www.nhs.uk/using-the-nhs/nhs-services/urgent-and-emergency-care/when-to-visit-an-urgent-care-centre/">urgent care centres or minor injuries units</a>. A&amp;E is not an alternative to a GP appointment.</p>

                    <p>If your GP is closed you can go to <a href="https://111.nhs.uk/?utm_source=nhsuk&amp;utm_campaign=nhs_services&amp;utm_content=when_to_go_to_ae">111.nhs.uk</a> or call 111, which will direct you to the best local service.</p>

                    <p>Alternatively, you can visit an NHS <a href="https://www.nhs.uk/using-the-nhs/nhs-services/urgent-and-emergency-care/when-to-visit-an-urgent-care-centre/">urgent treatment or walk-in centre</a>, which will also treat minor illnesses without an appointment.</p>

                    <h2>How to find your nearest A&amp;E</h2>

                    <p>Not all hospitals have an A&amp;E department. You can use the find services search on this site to see if there is one near you.</p>

                    <p><a href="https://www.nhs.uk/Service-Search/Accident-and-emergency-services/LocationSearch/428">Find your nearest A&amp;E</a></p>

                    <p>Alternatively, many hospitals have their own website and generally describe the urgent and emergency care services they offer.</p>

                    <p>If you dialled 999 for an ambulance and you have to be taken to hospital, then the ambulance team will take you to the most appropriate A&amp;E – this may not be the closest. Find out more about making 999 emergency calls.</p>

                    <h2>What happens at A&amp;E?</h2>

                    <p>A&amp;E departments offer access 24 hours a day, 365 days a year. A&amp;E staff include paramedics, A&amp;E nurses, diagnostic radiographers, A&amp;E reception staff, porters, healthcare assistants and emergency medicine doctors. Medical staff are highly trained in all aspects of emergency medicine.</p>

                    <h3>1. Register</h3>

                    <p><strong>If you arrive by ambulance</strong>, the ambulance crew will provide the relevant details to reception and hand you over to the clinical staff. If you are seriously ill, the staff will already know because the ambulance crew will have alerted them on the way in.</p>

                    <p>If you're not in a life-threatening or serious condition, you will be prioritised by the A&amp;E hospital team along with other patients waiting to be seen – arriving by ambulance does not necessarily mean you will be seen sooner than if you had walked in to A&amp;E.</p>

                    <p><strong>If you go to A&amp;E by yourself</strong>, you'll need to register first. You'll be asked a few questions such as name and address but also why you are visiting A&amp;E. If you have been to the hospital before, the reception staff will also have access to <a href="https://www.nhs.uk/using-the-nhs/about-the-nhs/your-health-records/">your health records</a>.</p>

                    <p>Once you've registered, you'll be asked to wait until you are called for your assessment.</p>

                    <p>Some hospitals have a separate children's A&amp;E department where medical staff are specially trained to deal with children's health issues. You may be asked to go straight to the children's area where your child can be registered and assessed</p>

                    <p>If you need special assistance because of a physical or mental disability then you should let staff know right away. The hospital may be able to call a Learning Disabilities Liaison, a member of their liaison psychiatry team, or provide any other assistance you or your carer may need.</p>

                    <h3>2. Assessment – triage</h3>

                    <p>Once you have registered you'll generally be pre-assessed by a nurse or doctor before further actions are taken. This is called triage. The process is carried out on all patients attending A&amp;E. Triage ensures people with the most serious conditions are seen first.</p>

                    <h3>3. Treatment, transfer or discharge</h3>

                    <p>What happens next depends on the results of your assessment. Sometimes further tests need to be arranged before a course of action can be decided.</p>

                    <p>If the nurse or doctor feels your situation is not a serious accident or emergency, you may be sent to a nearby urgent care centre, minor injuries unit or referred to a GP on site. This will reduce the waiting queue in A&amp;E and at the same time allows you (the patient with the lesser injury) to be treated quickly as well. </p>

                    <p>The waiting time target for patients in A&amp;E is currently set to 4 hours from arrival to admission, transfer or discharge. However, not all hospitals have <a href="https://www.nhs.uk/using-the-nhs/nhs-services/urgent-and-emergency-care/when-to-visit-an-urgent-care-centre/">urgent care centres</a> associated, which means people with minor injuries may have a longer wait until they are seen.</p>

                    <p>In some cases you may be sent home and asked to arrange for a <a href="/using-the-nhs/nhs-services/gps/referrals-for-specialist-care/">GP referral</a> or you may be given a prescription and sent home. Either way, the hospital will inform your GP that you have been to A&amp;E.</p>

                    <p>If your situation is more complicated, you may be seen by an A&amp;E doctor or referred to a specialist unit. For example, this could happen for <a href="https://www.nhs.uk/conditions/eye-injuries/">eye problems</a>, <a href="https://www.nhs.uk/conditions/stroke/">strokes</a> or emergency gynaecology.</p>
                    </p>
                `,
            ],
            [
                'Deprivation and emergency admissions for cancers',
                `The reasons for Pollock and Vickers's findings about the relation between deprivation and emergency admissions for cancers remain speculative.1 To impute the differences in care to failures of primary care seems unfair at this stage. The authors discuss a range of possible explanations, but many other could also be relevant.`,
                `<p>The reasons for Pollock and Vickers’s findings about the relation between deprivation and emergency admissions for cancers remain speculative.1 To impute the differences in care to failures of primary care seems unfair at this stage. The authors discuss a range of possible explanations, but many other could also be relevant.

                Day case treatment may require a certain level of facilities at home that are less commonly available in deprived areas. The presence of another adult at home may also be a prerequisite. Single people may be more likely to live in deprived areas; patients from deprived areas may be more likely to have a working partner who cannot afford to take time off work or who has a job where such absences would be unacceptable.

                Patients with lung cancer due to smoking (more common in areas where smoking is more prevalent) may be less likely to have an operable malignancy because of concomitant disease related to smoking. The authors mention this in their discussion, but limiting the study to inpatient finished consultant episodes with a primary diagnosis of any of the three cancers of interest does not give any information about comorbidity.

                I hope further research will be carried out to help elucidate the reasons behind the apparently inequitable access and treatment decisions that Pollock and Vickers have found. Both qualitative and quantitative research methods could be used to study patients’ and professionals’ experiences as patients pass through the system. Perhaps allocation of blame should wait until such results are available.</p>`,
            ],
            [
                'Deprivation and emergency admissions for cancers',
                `The reasons for Pollock and Vickers's findings about the relation between deprivation and emergency admissions for cancers remain speculative.1 To impute the differences in care to failures of primary care seems unfair at this stage. The authors discuss a range of possible explanations, but many other could also be relevant.`,
                `<p>
                    The reasons for Pollock and Vickers’s findings about the relation between deprivation and emergency admissions for cancers remain speculative.1 To impute the differences in care to failures of primary care seems unfair at this stage. The authors discuss a range of possible explanations, but many other could also be relevant.

                    Day case treatment may require a certain level of facilities at home that are less commonly available in deprived areas. The presence of another adult at home may also be a prerequisite. Single people may be more likely to live in deprived areas; patients from deprived areas may be more likely to have a working partner who cannot afford to take time off work or who has a job where such absences would be unacceptable.

                    Patients with lung cancer due to smoking (more common in areas where smoking is more prevalent) may be less likely to have an operable malignancy because of concomitant disease related to smoking. The authors mention this in their discussion, but limiting the study to inpatient finished consultant episodes with a primary diagnosis of any of the three cancers of interest does not give any information about comorbidity.

                    I hope further research will be carried out to help elucidate the reasons behind the apparently inequitable access and treatment decisions that Pollock and Vickers have found. Both qualitative and quantitative research methods could be used to study patients’ and professionals’ experiences as patients pass through the system. Perhaps allocation of blame should wait until such results are available.
                </p>`,
            ],
        ]

        const { rows: resultRows } = await database.query(
            `SELECT _id FROM results WHERE title = $1;`,
            [`Deprivation and emergency admissions for cancers`]
        )

        if (!resultRows || resultRows.length === 0) {
            const QUERY = format(`INSERT INTO results (title, summary, content) VALUES %L;`, data)

            await database.query(QUERY)
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
