//
//  ViewController.h
//  weekTwo
//
//  Created by Lucy Hutcheson on 10/3/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController
{
    IBOutlet UISegmentedControl *segmentControl;
}

-(IBAction)onClick:(id)sender;
-(IBAction)onChange:(id)sender;

@end
