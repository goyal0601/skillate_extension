package com.skillate.web.extension;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.skillate.web.resume.entity.Resume;
import com.skillate.web.resume.repository.ResumeRepository;

import lombok.extern.log4j.Log4j2;

@Controller
@Log4j2
public class ExtensionController {
	
	@Autowired
	private ResumeRepository resumeRepository;
	
    @RequestMapping("/resume-test")
    public String resumeTest() {
        return "form";
    }
    
    @RequestMapping(value = "/resume-test", method=RequestMethod.POST)
    public String resumeTestPost(@RequestParam("url") String linkedinUrl, Model model) {
    	model.addAttribute("url", linkedinUrl);
    	Resume resume = resumeRepository.findByOrganizationIdAndUrl(0, linkedinUrl);
    	model.addAttribute("resume", resume);
    	return "value";
    }
    
    
    @RequestMapping(value = "/upload-html", method=RequestMethod.GET)
    public String uploadHtml() {
        return "form";
    }
    
//    @RequestMapping(value = "/upload-html", method=RequestMethod.POST)
//    public String processHtmlFile(@RequestParam MultipartFile file, Model model) {
//    	LinkedinConverter linkedinConverter = new LinkedinConverter();
//    	Resume resume = linkedinConverter.convert(file);
//    	resume = resumeRepository.save(resume);
//    	model.addAttribute("resume", resume);
//    	return "value";
//    }
    private boolean checkEducation(Resume newResume, Resume oldResume) {
        if(newResume.getEducations.size() >= oldResume.getEducations.size()){
            return true;
        }
        return false;
    }
    private boolean checkExperience(Resume newResume, Resume oldResume) {
        if(newResume.getExperiences.size() >= oldResume.getExperiences.size()){
            return true;
        }
        return false;
    }
    private boolean checkPublication(Resume newResume, Resume oldResume) {
        if(newResume.getPublications.size() >= oldResume.getPublications.size()){
            return true;
        }
        return false;
    }
    private boolean checkProject(Resume newResume, Resume oldResume) {
        if(newResume.getProjects.size() >= oldResume.getProjects.size()){
            return true;
        }
        return false;
    }
    private boolean checkSkill(Resume newResume, Resume oldResume) {
        if(newResume.getSkills.size() >= oldResume.getSkills.size()){
            return true;
        }
        return false;
    }
    private boolean checkContactNumber(Resume newResume, Resume oldResume) {
        
        return false;
    }
    private boolean checkEmail(Resume newResume, Resume oldResume) {
        
        return false;
    }
    @RequestMapping(value = "/extensions/add-resume", method=RequestMethod.POST)
    @ResponseBody
    public Resume resumeTestPost(@RequestBody Resume resume) {
    	String url = resume.getUrl();
        log.info("linkedin url {}", url);
    	Resume alreadySavedResume = resumeRepository.findByOrganizationIdAndUrl(0, url);
        if(alreadySavedResume != null) {
            if(checkEducation(resume, alreadySavedResume)) {
                alreadySavedResume.setEducations(resume.getEducations());
            }
            if(checkExperience(resume, alreadySavedResume)){
                alreadySavedResume.setExperiences(resume.getExperiences());
            }
            if(checkPublication(resume, alreadySavedResume)){
                alreadySavedResume.setPublications(resume.getPublications());
            }
            if(checkProject(resume, alreadySavedResume)){
                alreadySavedResume.setProjects(resume.getProjects());
            }
            if(checkSkill(resume, alreadySavedResume)){
                alreadySavedResume.setSkills(resume.getSkills());
            }
            if(checkContactNumber(resume, alreadySavedResume)){
                alreadySavedResume.setContactNumber(resume.getContactNumber());
            }
            if(checkEmail(resume, alreadySavedResume)){
                alreadySavedResume.setEmail(resume.getEmail());
            }
            alreadySavedResume = resumeRepository.save(alreadySavedResume);
            return alreadySavedResume;
        }
    	Resume savedResume = resumeRepository.save(resume);
    	return savedResume;

    }

    @RequestMapping(value = "api/extensions/get-resume", method=RequestMethod.GET)
    @ResponseBody
    public Resume resumeTestGet(@RequestParam String url) {
    	Resume resume = resumeRepository.findByOrganizationIdAndUrl(0, url);
        log.info("resume {}", resume);
    	return resume;
    }
}
