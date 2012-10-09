//
//  ViewController.h
//  weekThree
//
//  Created by Lucy Hutcheson on 10/8/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AddViewController.h"

@interface ViewController : UIViewController <AddViewDelegate>
{
    IBOutlet UITextView *eventDisplay;
}


-(IBAction)onClick:(id)sender;

@end
