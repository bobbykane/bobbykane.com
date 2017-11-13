<section class="contact">
    <div class="pageWrap">
        <h1>Let's Talk</h1>
        <p class="centered">Whether you have a project you're looking to chat about, or just want to see what I'm up to; this form puts you at the top of my inbox - seriously.</p>
        <form id="work" action="http://formspree.io/hi@bobbykane.com" method="POST">
            <div class="group">
                <label>Name*</label>
                <input type="text" class="name" name="First_Name" placeholder="First">
                <input type="text" class="name" name="Last_Name" placeholder="Last">
                <div class="clearfix"></div>
            </div>
            <div class="group">
                <label>Email*</label>
                <input type="email" name="Email">
            </div>
            <div class="group selectInput">
                <label>Subject*</label>
                <select id="subject" name="Subject">
                    <option value="" disabled="disabled" selected="selected">Select...</option>
                    <option value="General Inquiry"> General Inquiry </option>
                    <option value="Discuss a project"> Discuss a project </option>
                    <option value="Talk shop"> Talk shop </option>
                </select>
            </div>
            <div class="group">
                <label>Tell me about it*</label>
                <textarea name="Tell_me_about_it" cols="30" rows="5"></textarea>
            </div>
            <div class="group projectName">
                <label>Project Name*</label>
                <input type="text" name="Project_Name">
            </div>
            <div class="group projectTimeline">
                <label>Project Timeline*</label>
                <input type="text" name="Project_Timeline">
            </div>
            <div class="group budget selectInput">
                <label>Budget*</label>
                <select name="Budget">
                    <option value="" disabled="disabled" selected="selected">Select...</option>
                    <option value="None yet"> None yet </option>
                    <option value="Less than $2,500"> Less than $2,500 </option>
                    <option value="$2,500-$5,000"> $2,500-$5,000 </option>
                    <option value="$5,000-7,500"> $5,000-7,500 </option>
                    <option value="$7,500-$10,000"> $7,500-$10,000 </option>
                    <option value="More than $10,000"> More than $10,000 </option>
                </select>
            </div>
            <div class="group">
                <input type="submit" class="btn lg" value="Start this conversation">
                <div class="loader">
                    <span id="l1"></span>
                    <span id="l2"></span>
                    <span id="l3"></span>
                </div>
            </div>
            <input type="text" name="_gotcha" style="display:none" />
            <input type="hidden" name="_subject" value="New submission on bobbykane.com" />
            <input type="hidden" name="_next" value="/contact/thanks" />
        </form>
    </div>
</section>