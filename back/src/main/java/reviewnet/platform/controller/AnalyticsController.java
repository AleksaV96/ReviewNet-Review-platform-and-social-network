package reviewnet.platform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import reviewnet.platform.service.AnalyticsService;


@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/postCount")
    public ResponseEntity<Iterable<Number>> countAllPosts(){
        return new ResponseEntity<>(this.analyticsService.getPostCount(), HttpStatus.OK);
    }
    
    @GetMapping("/postTypeStatistics")
    public ResponseEntity<Iterable<Number>> postTypeStatistics(){
        return new ResponseEntity<>(this.analyticsService.getPostTypeStatistics(), HttpStatus.OK);
    }
    
    @GetMapping(value = "/elementPostTypeStatistics/{id}")
    public ResponseEntity<Iterable<Number>> elementPostTypeStatistics(@PathVariable String id){
        return new ResponseEntity<>(this.analyticsService.getElementPostsTypeStatistics(id), HttpStatus.OK);
    }
    
    @GetMapping("/userTypeStatistics")
    public ResponseEntity<Iterable<Number>> userTypeStatistics(){
        return new ResponseEntity<>(this.analyticsService.getUserTypeStatistics(), HttpStatus.OK);
    }
}
